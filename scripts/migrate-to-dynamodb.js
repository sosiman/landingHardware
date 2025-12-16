// migrate-to-dynamodb.js
// Script para migrar herramientas desde all-tools.json a DynamoDB

const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

// Configuración AWS (reemplaza con tus credenciales de AWS Academy)
AWS.config.update({
  region: 'us-east-1',
  accessKeyId: 'TU_ACCESS_KEY_AQUI',
  secretAccessKey: 'TU_SECRET_KEY_AQUI',
  sessionToken: 'TU_SESSION_TOKEN_AQUI' // Necesario para AWS Academy
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = 'ToolsDatabase';

// Leer el archivo JSON
const toolsPath = path.join(__dirname, '../src/data/all-tools.json');
const tools = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));

console.log(`📊 Total de herramientas a migrar: ${tools.length}`);

// Agrupar herramientas en lotes de 25 (límite de DynamoDB BatchWrite)
function chunkArray(array, size) {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
}

// Subir un lote a DynamoDB
async function uploadBatch(batch, batchNumber) {
  const params = {
    RequestItems: {
      [TABLE_NAME]: batch.map(tool => ({
        PutRequest: {
          Item: {
            id: tool.id,
            name: tool.name,
            url: tool.url,
            desc: tool.desc || '',
            category: tool.category,
            source: tool.source,
            // Campo combinado para búsqueda full-text
            searchText: `${tool.name} ${tool.desc} ${tool.category}`.toLowerCase(),
            timestamp: new Date().toISOString()
          }
        }
      }))
    }
  };

  try {
    await dynamodb.batchWrite(params).promise();
    console.log(`✅ Lote ${batchNumber} subido (${batch.length} items)`);
  } catch (error) {
    console.error(`❌ Error en lote ${batchNumber}:`, error.message);
    throw error;
  }
}

// Migración principal
async function migrateTools() {
  console.log('🚀 Iniciando migración a DynamoDB...\n');

  const batches = chunkArray(tools, 25);
  let totalUploaded = 0;

  for (let i = 0; i < batches.length; i++) {
    await uploadBatch(batches[i], i + 1);
    totalUploaded += batches[i].length;
    
    // Pausa para evitar throttling de AWS
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const progress = ((totalUploaded / tools.length) * 100).toFixed(2);
    console.log(`📈 Progreso: ${progress}% (${totalUploaded}/${tools.length})\n`);
  }

  console.log('✅ ¡Migración completada!');
  console.log(`📊 Total: ${totalUploaded} herramientas`);
}

// Crear tabla DynamoDB (solo ejecutar una vez)
async function createTable() {
  const dynamoDBClient = new AWS.DynamoDB();
  
  const params = {
    TableName: TABLE_NAME,
    KeySchema: [
      { AttributeName: 'id', KeyType: 'HASH' } // Primary key
    ],
    AttributeDefinitions: [
      { AttributeName: 'id', AttributeType: 'S' },
      { AttributeName: 'category', AttributeType: 'S' },
      { AttributeName: 'name', AttributeType: 'S' }
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'CategoryIndex',
        KeySchema: [
          { AttributeName: 'category', KeyType: 'HASH' },
          { AttributeName: 'name', KeyType: 'RANGE' }
        ],
        Projection: { ProjectionType: 'ALL' },
        ProvisionedThroughput: {
          ReadCapacityUnits: 5,
          WriteCapacityUnits: 5
        }
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 10,
      WriteCapacityUnits: 10
    }
  };

  try {
    await dynamoDBClient.createTable(params).promise();
    console.log('✅ Tabla creada exitosamente');
    await dynamoDBClient.waitFor('tableExists', { TableName: TABLE_NAME }).promise();
    console.log('✅ Tabla activa');
  } catch (error) {
    if (error.code === 'ResourceInUseException') {
      console.log('ℹ️ La tabla ya existe');
    } else {
      console.error('❌ Error creando tabla:', error.message);
      throw error;
    }
  }
}

// Ejecutar
(async () => {
  try {
    console.log('🔧 Paso 1: Crear tabla DynamoDB\n');
    await createTable();
    
    console.log('\n🔧 Paso 2: Migrar herramientas\n');
    await migrateTools();
  } catch (error) {
    console.error('\n❌ Error fatal:', error.message);
    process.exit(1);
  }
})();
