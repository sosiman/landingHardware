import { useRef, useEffect } from 'react';

const ElectricalBorder = ({ className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 uResolution;
      uniform float uTime;
      
      vec3 hsv2rgb(vec3 c) {
        vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
        return c.z * mix(vec3(1.0), rgb, c.y);
      }
      
      float hash11(float p) {
        p = fract(p * .1031);
        p *= p + 33.33;
        p *= p + p;
        return fract(p);
      }
      
      float hash12(vec2 p) {
        vec3 p3 = fract(vec3(p.xyx) * .1031);
        p3 += dot(p3, p3.yzx + 33.33);
        return fract((p3.x + p3.y) * p3.z);
      }
      
      float noise(vec2 p) {
        vec2 ip = floor(p);
        vec2 fp = fract(p);
        float a = hash12(ip);
        float b = hash12(ip + vec2(1.0, 0.0));
        float c = hash12(ip + vec2(0.0, 1.0));
        float d = hash12(ip + vec2(1.0, 1.0));
        vec2 t = smoothstep(0.0, 1.0, fp);
        return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
      }
      
      float fbm(vec2 p) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 5; ++i) {
          value += amplitude * noise(p);
          p *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }
      
      void main() {
        vec2 uv = gl_FragCoord.xy / uResolution.xy;
        
        // Define border width
        float borderWidth = 0.015;
        
        // Calculate distance to edges
        float distTop = uv.y;
        float distBottom = 1.0 - uv.y;
        float distLeft = uv.x;
        float distRight = 1.0 - uv.x;
        
        // Find closest edge
        float dist = min(min(distTop, distBottom), min(distLeft, distRight));
        
        // Determine which edge is closest
        bool isTop = distTop == dist;
        bool isLeft = distLeft == dist;
        bool isRight = distRight == dist;
        
        // Create electrical effect along borders
        float edgeProgress;
        if (isTop || distBottom == dist) {
          edgeProgress = uv.x;
        } else {
          edgeProgress = uv.y;
        }
        
        vec2 borderUv = vec2(
          mod(edgeProgress + uTime * 0.8, 1.0),
          dist * 100.0
        );
        
        float noiseValue = fbm(borderUv * 15.0 + uTime * 1.2);
        float electricalPattern = smoothstep(0.0, 0.2, noiseValue) * smoothstep(0.8, 0.3, noiseValue);
        electricalPattern = pow(electricalPattern, 0.7);
        
        // Create the border effect
        float borderMask = smoothstep(borderWidth, 0.0, dist);
        vec3 electricalColor = hsv2rgb(vec3(200.0 / 360.0 + sin(uTime * 1.5) * 0.05, 0.95, 1.0));
        
        // Add some glow
        float glow = pow(1.0 - dist / borderWidth, 3.0);
        
        vec3 col = electricalColor * electricalPattern * borderMask * glow * 2.5;
        
        gl_FragColor = vec4(col, 1.0);
      }
    `;

    const compileShader = (source, type) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    const uResolutionLocation = gl.getUniformLocation(program, 'uResolution');
    const uTimeLocation = gl.getUniformLocation(program, 'uTime');

    const startTime = performance.now();
    const render = () => {
      resizeCanvas();
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uResolutionLocation, canvas.width, canvas.height);
      const currentTime = performance.now();
      gl.uniform1f(uTimeLocation, (currentTime - startTime) / 1000.0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    };
    requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className={`electrical-border ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
};

export default ElectricalBorder;

