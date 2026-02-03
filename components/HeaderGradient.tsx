"use client";

import React, { useEffect, useRef } from "react";

class TouchTexture {
  size = 64;
  width = this.size;
  height = this.size;
  maxAge = 64;
  radius = 0.25 * this.size;
  speed = 1 / this.maxAge;
  trail: Array<any> = [];
  last: any = null;

  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    const ctx = this.canvas.getContext("2d");
    if (!ctx) throw new Error("2D context not available");
    this.ctx = ctx;
    this.clear();
  }

  clear() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  addTouch(point: { x: number; y: number }) {
    let force = 0;
    let vx = 0;
    let vy = 0;
    const last = this.last;
    if (last) {
      const dx = point.x - last.x;
      const dy = point.y - last.y;
      if (dx === 0 && dy === 0) return;
      const dd = dx * dx + dy * dy;
      const d = Math.sqrt(dd);
      vx = dx / d;
      vy = dy / d;
      force = Math.min(dd * 20000, 2.0);
    }
    this.last = { x: point.x, y: point.y };
    this.trail.push({ x: point.x, y: point.y, age: 0, force, vx, vy });
  }

  update() {
    this.clear();
    const speed = this.speed;
    for (let i = this.trail.length - 1; i >= 0; i--) {
      const point = this.trail[i];
      let f = point.force * speed * (1 - point.age / this.maxAge);
      point.x += point.vx * f;
      point.y += point.vy * f;
      point.age++;
      if (point.age > this.maxAge) {
        this.trail.splice(i, 1);
      } else {
        this.drawPoint(point);
      }
    }
  }

  drawPoint(point: any) {
    const pos = {
      x: point.x * this.width,
      y: (1 - point.y) * this.height,
    };

    let intensity = 1;
    if (point.age < this.maxAge * 0.3) {
      intensity = Math.sin((point.age / (this.maxAge * 0.3)) * (Math.PI / 2));
    } else {
      const t = 1 - (point.age - this.maxAge * 0.3) / (this.maxAge * 0.7);
      intensity = -t * (t - 2);
    }
    intensity *= point.force;

    const radius = this.radius;
    const color = `${((point.vx + 1) / 2) * 255}, ${((point.vy + 1) / 2) * 255}, ${
      intensity * 255
    }`;
    const offset = this.size * 5;
    this.ctx.shadowOffsetX = offset;
    this.ctx.shadowOffsetY = offset;
    this.ctx.shadowBlur = radius * 1;
    this.ctx.shadowColor = `rgba(${color},${0.2 * intensity})`;

    this.ctx.beginPath();
    this.ctx.fillStyle = "rgba(255,0,0,1)";
    this.ctx.arc(pos.x - offset, pos.y - offset, radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
}

function compileShader(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type)!;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error("Shader compile error: " + info);
  }
  return shader;
}

function createProgram(
  gl: WebGLRenderingContext,
  vsSrc: string,
  fsSrc: string,
) {
  const vs = compileShader(gl, gl.VERTEX_SHADER, vsSrc);
  const fs = compileShader(gl, gl.FRAGMENT_SHADER, fsSrc);
  const prog = gl.createProgram()!;
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    const info = gl.getProgramInfoLog(prog);
    gl.deleteProgram(prog);
    throw new Error("Program link error: " + info);
  }
  return prog;
}

const vertexShader = `
attribute vec2 aPosition;
varying vec2 vUv;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

const fragmentShader = `
precision mediump float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
uniform vec3 uColor5;
uniform vec3 uColor6;
uniform float uSpeed;
uniform float uIntensity;
uniform sampler2D uTouchTexture;
uniform float uGrainIntensity;
uniform float uZoom;
uniform vec3 uDarkNavy;
uniform float uGradientSize;
uniform float uGradientCount;
uniform float uColor1Weight;
uniform float uColor2Weight;

varying vec2 vUv;

#define PI 3.14159265359

// Grain function for film grain effect
float grain(vec2 uv, float time) {
  vec2 grainUv = uv * uResolution * 0.5;
  float grainValue = fract(sin(dot(grainUv + time, vec2(12.9898, 78.233))) * 43758.5453);
  return grainValue * 2.0 - 1.0;
}

vec3 getGradientColor(vec2 uv, float time) {
  float gradientRadius = uGradientSize;

  vec2 center1 = vec2(
    0.5 + sin(time * uSpeed * 0.4) * 0.4,
    0.5 + cos(time * uSpeed * 0.5) * 0.4
  );
  vec2 center2 = vec2(
    0.5 + cos(time * uSpeed * 0.6) * 0.5,
    0.5 + sin(time * uSpeed * 0.45) * 0.5
  );
  vec2 center3 = vec2(
    0.5 + sin(time * uSpeed * 0.35) * 0.45,
    0.5 + cos(time * uSpeed * 0.55) * 0.45
  );
  vec2 center4 = vec2(
    0.5 + cos(time * uSpeed * 0.5) * 0.4,
    0.5 + sin(time * uSpeed * 0.4) * 0.4
  );
  vec2 center5 = vec2(
    0.5 + sin(time * uSpeed * 0.7) * 0.35,
    0.5 + cos(time * uSpeed * 0.6) * 0.35
  );
  vec2 center6 = vec2(
    0.5 + cos(time * uSpeed * 0.45) * 0.5,
    0.5 + sin(time * uSpeed * 0.65) * 0.5
  );
  vec2 center7 = vec2(
    0.5 + sin(time * uSpeed * 0.55) * 0.38,
    0.5 + cos(time * uSpeed * 0.48) * 0.42
  );
  vec2 center8 = vec2(
    0.5 + cos(time * uSpeed * 0.65) * 0.36,
    0.5 + sin(time * uSpeed * 0.52) * 0.44
  );
  vec2 center9 = vec2(
    0.5 + sin(time * uSpeed * 0.42) * 0.41,
    0.5 + cos(time * uSpeed * 0.58) * 0.39
  );
  vec2 center10 = vec2(
    0.5 + cos(time * uSpeed * 0.48) * 0.37,
    0.5 + sin(time * uSpeed * 0.62) * 0.43
  );
  vec2 center11 = vec2(
    0.5 + sin(time * uSpeed * 0.68) * 0.33,
    0.5 + cos(time * uSpeed * 0.44) * 0.46
  );
  vec2 center12 = vec2(
    0.5 + cos(time * uSpeed * 0.38) * 0.39,
    0.5 + sin(time * uSpeed * 0.56) * 0.41
  );

  float dist1 = length(uv - center1);
  float dist2 = length(uv - center2);
  float dist3 = length(uv - center3);
  float dist4 = length(uv - center4);
  float dist5 = length(uv - center5);
  float dist6 = length(uv - center6);
  float dist7 = length(uv - center7);
  float dist8 = length(uv - center8);
  float dist9 = length(uv - center9);
  float dist10 = length(uv - center10);
  float dist11 = length(uv - center11);
  float dist12 = length(uv - center12);

  float influence1 = 1.0 - smoothstep(0.0, gradientRadius, dist1);
  float influence2 = 1.0 - smoothstep(0.0, gradientRadius, dist2);
  float influence3 = 1.0 - smoothstep(0.0, gradientRadius, dist3);
  float influence4 = 1.0 - smoothstep(0.0, gradientRadius, dist4);
  float influence5 = 1.0 - smoothstep(0.0, gradientRadius, dist5);
  float influence6 = 1.0 - smoothstep(0.0, gradientRadius, dist6);
  float influence7 = 1.0 - smoothstep(0.0, gradientRadius, dist7);
  float influence8 = 1.0 - smoothstep(0.0, gradientRadius, dist8);
  float influence9 = 1.0 - smoothstep(0.0, gradientRadius, dist9);
  float influence10 = 1.0 - smoothstep(0.0, gradientRadius, dist10);
  float influence11 = 1.0 - smoothstep(0.0, gradientRadius, dist11);
  float influence12 = 1.0 - smoothstep(0.0, gradientRadius, dist12);

  vec2 rotatedUv1 = uv - 0.5;
  float angle1 = time * uSpeed * 0.15;
  rotatedUv1 = vec2(
    rotatedUv1.x * cos(angle1) - rotatedUv1.y * sin(angle1),
    rotatedUv1.x * sin(angle1) + rotatedUv1.y * cos(angle1)
  );
  rotatedUv1 += 0.5;

  vec2 rotatedUv2 = uv - 0.5;
  float angle2 = -time * uSpeed * 0.12;
  rotatedUv2 = vec2(
    rotatedUv2.x * cos(angle2) - rotatedUv2.y * sin(angle2),
    rotatedUv2.x * sin(angle2) + rotatedUv2.y * cos(angle2)
  );
  rotatedUv2 += 0.5;

  float radialGradient1 = length(rotatedUv1 - 0.5);
  float radialGradient2 = length(rotatedUv2 - 0.5);
  float radialInfluence1 = 1.0 - smoothstep(0.0, 0.8, radialGradient1);
  float radialInfluence2 = 1.0 - smoothstep(0.0, 0.8, radialGradient2);

  vec3 color = vec3(0.0);
  color += uColor1 * influence1 * (0.55 + 0.45 * sin(time * uSpeed)) * uColor1Weight;
  color += uColor2 * influence2 * (0.55 + 0.45 * cos(time * uSpeed * 1.2)) * uColor2Weight;
  color += uColor3 * influence3 * (0.55 + 0.45 * sin(time * uSpeed * 0.8)) * uColor1Weight;
  color += uColor4 * influence4 * (0.55 + 0.45 * cos(time * uSpeed * 1.3)) * uColor2Weight;
  color += uColor5 * influence5 * (0.55 + 0.45 * sin(time * uSpeed * 1.1)) * uColor1Weight;
  color += uColor6 * influence6 * (0.55 + 0.45 * cos(time * uSpeed * 0.9)) * uColor2Weight;

  if (uGradientCount > 6.0) {
    color += uColor1 * influence7 * (0.55 + 0.45 * sin(time * uSpeed * 1.4)) * uColor1Weight;
    color += uColor2 * influence8 * (0.55 + 0.45 * cos(time * uSpeed * 1.5)) * uColor2Weight;
    color += uColor3 * influence9 * (0.55 + 0.45 * sin(time * uSpeed * 1.6)) * uColor1Weight;
    color += uColor4 * influence10 * (0.55 + 0.45 * cos(time * uSpeed * 1.7)) * uColor2Weight;
  }
  if (uGradientCount > 10.0) {
    color += uColor5 * influence11 * (0.55 + 0.45 * sin(time * uSpeed * 1.8)) * uColor1Weight;
    color += uColor6 * influence12 * (0.55 + 0.45 * cos(time * uSpeed * 1.9)) * uColor2Weight;
  }

  color += mix(uColor1, uColor3, radialInfluence1) * 0.45 * uColor1Weight;
  color += mix(uColor2, uColor4, radialInfluence2) * 0.4 * uColor2Weight;

  color = clamp(color, vec3(0.0), vec3(1.0)) * uIntensity;

  float luminance = dot(color, vec3(0.299, 0.587, 0.114));
  color = mix(vec3(luminance), color, 1.35);

  color = pow(color, vec3(0.92));

  float brightness1 = length(color);
  float mixFactor1 = max(brightness1 * 1.2, 0.15);
  color = mix(uDarkNavy, color, mixFactor1);

  float maxBrightness = 1.0;
  float brightness = length(color);
  if (brightness > maxBrightness) {
    color = color * (maxBrightness / brightness);
  }

  return color;
}

void main() {
  vec2 uv = vUv;

  vec4 touchTex = texture2D(uTouchTexture, uv);
  float vx = -(touchTex.r * 2.0 - 1.0);
  float vy = -(touchTex.g * 2.0 - 1.0);
  float intensity = touchTex.b;
  uv.x += vx * 0.8 * intensity;
  uv.y += vy * 0.8 * intensity;

  vec2 center = vec2(0.5);
  float dist = length(uv - center);
  float ripple = sin(dist * 20.0 - uTime * 3.0) * 0.04 * intensity;
  float wave = sin(dist * 15.0 - uTime * 2.0) * 0.03 * intensity;
  uv += vec2(ripple + wave);

  vec3 color = getGradientColor(uv, uTime);

  float grainValue = grain(uv, uTime);
  color += grainValue * uGrainIntensity;

  float timeShift = uTime * 0.5;
  color.r += sin(timeShift) * 0.02;
  color.g += cos(timeShift * 1.4) * 0.02;
  color.b += sin(timeShift * 1.2) * 0.02;

  float brightness2 = length(color);
  float mixFactor2 = max(brightness2 * 1.2, 0.15);
  color = mix(uDarkNavy, color, mixFactor2);

  color = clamp(color, vec3(0.0), vec3(1.0));

  float maxBrightness = 1.0;
  float brightness = length(color);
  if (brightness > maxBrightness) {
    color = color * (maxBrightness / brightness);
  }

  gl_FragColor = vec4(color, 1.0);
}
`;

export default function HeaderGradient() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const progRef = useRef<WebGLProgram | null>(null);
  const touchRef = useRef<TouchTexture | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    if (!canvas) return;

    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) {
      console.error("WebGL not available");
      return;
    }

    const program = createProgram(gl, vertexShader, fragmentShader);
    progRef.current = program;
    gl.useProgram(program);

    const posLoc = gl.getAttribLocation(program, "aPosition");
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);

    const verts = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
    gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    const uTimeLoc = gl.getUniformLocation(program, "uTime");
    const uResolutionLoc = gl.getUniformLocation(program, "uResolution");
    const uTouchTextureLoc = gl.getUniformLocation(program, "uTouchTexture");
    const uGrainIntensityLoc = gl.getUniformLocation(
      program,
      "uGrainIntensity",
    );
    const uDarkNavyLoc = gl.getUniformLocation(program, "uDarkNavy");
    const uSpeedLoc = gl.getUniformLocation(program, "uSpeed");
    const uIntensityLoc = gl.getUniformLocation(program, "uIntensity");
    const uGradientSizeLoc = gl.getUniformLocation(program, "uGradientSize");
    const uGradientCountLoc = gl.getUniformLocation(program, "uGradientCount");
    const uColor1Loc = gl.getUniformLocation(program, "uColor1");
    const uColor2Loc = gl.getUniformLocation(program, "uColor2");
    const uColor3Loc = gl.getUniformLocation(program, "uColor3");
    const uColor4Loc = gl.getUniformLocation(program, "uColor4");
    const uColor5Loc = gl.getUniformLocation(program, "uColor5");
    const uColor6Loc = gl.getUniformLocation(program, "uColor6");
    const uColor1WeightLoc = gl.getUniformLocation(program, "uColor1Weight");
    const uColor2WeightLoc = gl.getUniformLocation(program, "uColor2Weight");

    
    gl.uniform1f(uGrainIntensityLoc, 0.08);
    gl.uniform3f(uDarkNavyLoc, 0.039, 0.055, 0.153);
    gl.uniform1f(uSpeedLoc, 1.2);
    gl.uniform1f(uIntensityLoc, 1.8);
    gl.uniform1f(uGradientSizeLoc, 0.45);
    gl.uniform1f(uGradientCountLoc, 12.0);

    
    gl.uniform3f(uColor1Loc, 0.945, 0.353, 0.133);
    gl.uniform3f(uColor2Loc, 0.039, 0.055, 0.153);
    gl.uniform3f(uColor3Loc, 0.945, 0.353, 0.133);
    gl.uniform3f(uColor4Loc, 0.039, 0.055, 0.153);
    gl.uniform3f(uColor5Loc, 0.945, 0.353, 0.133);
    gl.uniform3f(uColor6Loc, 0.039, 0.055, 0.153);
    gl.uniform1f(uColor1WeightLoc, 0.5);
    gl.uniform1f(uColor2WeightLoc, 1.8);

    
    const touchTexture = gl.createTexture();
    if (!touchTexture) throw new Error("Could not create texture");
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, touchTexture);
    
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    
    const initImg = new Uint8Array([0, 0, 0, 255]);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      1,
      1,
      0,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      initImg,
    );

    gl.uniform1i(uTouchTextureLoc, 0);

    const touch = new TouchTexture();
    touchRef.current = touch;

    function resize() {
      if (!gl) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(canvas.clientWidth * dpr));
      const height = Math.max(1, Math.floor(canvas.clientHeight * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      gl.useProgram(program);
      gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
    }

    resize();

    const onMouse = (ev: MouseEvent) => {
      touch.addTouch({
        x: ev.clientX / window.innerWidth,
        y: 1 - ev.clientY / window.innerHeight,
      });
    };
    const onTouch = (ev: TouchEvent) => {
      const t = ev.touches[0];
      if (!t) return;
      touch.addTouch({
        x: t.clientX / window.innerWidth,
        y: 1 - t.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("resize", resize);

    let start = performance.now();
    function tick(now: number) {
  if (!gl) return;   

  const t = (now - start) * 0.001;

  gl.useProgram(program);
  gl.uniform1f(uTimeLoc, t);

  touch.update();
  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, touchTexture);

  try {
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      touch.canvas,
    );
  } catch (err) {
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      touch.canvas,
    );
  }

  gl.clearColor(0.039, 0.055, 0.153, 1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  rafRef.current = requestAnimationFrame(tick);
}

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", resize);

      try {
        gl.deleteTexture(touchTexture);
        gl.deleteProgram(program);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        gl.deleteBuffer(buffer);
      } catch (e) {
        // ignore
      }
    };
  }, []);

  return (
    <div style={{ position: "absolute", inset: 0, zIndex: -1, overflow: "hidden", pointerEvents: "none"}}>
      <canvas
        ref={canvasRef}
        style={{ width: "100vw", height: "15vh", display: "internal" }}
        aria-hidden="true"

      />
    </div>
  );
}
