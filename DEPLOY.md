# Instrucciones de Despliegue - SUPERALGORITMO-INTEGRAL v3.0

## 📋 Requisitos Previos

1. **Cuenta de GitHub**: https://github.com
2. **Cuenta de Vercel**: https://vercel.com (puedes registrarte con GitHub)
3. **Git instalado**: https://git-scm.com/downloads
4. **Node.js 20+**: https://nodejs.org/

## 🚀 Paso 1: Preparar el Repositorio en GitHub

### 1.1 Crear repositorio en GitHub

1. Ve a https://github.com/new
2. Nombre del repositorio: `superalgoritmo-integral`
3. Descripción: `SUPERALGORITMO-INTEGRAL v3.0 - Mega-Agente de Ciberseguridad`
4. Visibilidad: **Public** (recomendado) o Private
5. **NO** inicializar con README (ya lo tenemos)
6. Click en "Create repository"

### 1.2 Inicializar Git localmente

```bash
# Navegar al directorio del proyecto
cd /ruta/al/proyecto/superalgoritmo-integral

# Inicializar Git
git init

# Añadir todos los archivos
git add .

# Primer commit
git commit -m "Initial commit: SUPERALGORITMO-INTEGRAL v3.0"

# Renombrar rama principal a main
git branch -M main

# Conectar con GitHub
git remote add origin https://github.com/TU_USUARIO/superalgoritmo-integral.git

# Push inicial
git push -u origin main
```

## 🔐 Paso 2: Configurar Secrets en GitHub

### 2.1 Obtener Vercel Token

1. Ve a https://vercel.com/account/tokens
2. Click en "Create Token"
3. Nombre: `github-actions`
4. Scope: All your projects (o el proyecto específico)
5. Expiration: No expiration (o 1 año)
6. Click en "Create"
7. **Copia el token** (solo se muestra una vez)

### 2.2 Obtener Vercel Org ID y Project ID

1. Ve a https://vercel.com/dashboard
2. Selecciona tu organización/proyecto
3. En la URL verás algo como: `https://vercel.com/TU_ORG/PROJECT_NAME`
4. El `TU_ORG` es tu Org ID

Para obtener el Project ID:
```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Link al proyecto
vercel link

# Ver el project ID en .vercel/project.json
cat .vercel/project.json
```

### 2.3 Añadir Secrets a GitHub

1. Ve a tu repositorio en GitHub
2. Click en **Settings** (Configuración)
3. En el menú lateral, click en **Secrets and variables** → **Actions**
4. Click en **New repository secret**

Añade estos 3 secrets:

| Name | Value |
|------|-------|
| `VERCEL_TOKEN` | El token que copiaste en 2.1 |
| `VERCEL_ORG_ID` | Tu Organization ID de Vercel |
| `VERCEL_PROJECT_ID` | Tu Project ID de Vercel |

5. Click en "Add secret" para cada uno

## 📦 Paso 3: Importar Proyecto en Vercel

### 3.1 Importar desde GitHub

1. Ve a https://vercel.com/new
2. Busca tu repositorio `superalgoritmo-integral`
3. Click en **Import**

### 3.2 Configurar el proyecto

**Framework Preset**: Vite (detectado automáticamente)

**Build Settings**:
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Environment Variables** (opcional):
Si quieres añadir API keys para los LLM providers:

| Name | Value |
|------|-------|
| `GEMINI_API_KEY` | Tu API key de Gemini |
| `OPENROUTER_API_KEY` | Tu API key de OpenRouter |
| `NVIDIA_API_KEY` | Tu API key de NVIDIA |
| `GROQ_API_KEY` | Tu API key de Groq |
| `DEEPSEEK_API_KEY` | Tu API key de DeepSeek |
| `MISTRAL_API_KEY` | Tu API key de Mistral |
| `CEREBRAS_API_KEY` | Tu API key de Cerebras |

### 3.3 Deploy

1. Click en **Deploy**
2. Espera 2-3 minutos
3. Tu aplicación estará disponible en: `https://superalgoritmo-integral.vercel.app`

## 🔄 Paso 4: CI/CD Automático

Ahora, cada vez que hagas push a la rama `main`:

1. **GitHub Actions** ejecutará automáticamente:
   - Tests
   - Build
   - Deploy a Vercel

2. **Pull Requests** generarán:
   - Preview deployments
   - URLs únicas para revisión

### Verificar el Pipeline

1. Ve a tu repositorio en GitHub
2. Click en **Actions**
3. Deberías ver el workflow ejecutándose

## 🌐 Paso 5: Dominio Personalizado (Opcional)

Si quieres usar tu propio dominio:

1. En Vercel, ve a tu proyecto
2. Click en **Settings** → **Domains**
3. Añade tu dominio (ej: `tu-dominio.com`)
4. Configura los DNS según las instrucciones de Vercel

## 📊 Paso 6: Verificar el Despliegue

### 6.1 Probar la aplicación

1. Abre la URL de Vercel
2. Navega por las 14 pestañas
3. Ejecuta el Auto-Test (pestaña 🧪)
4. Verifica que todas las funcionalidades funcionan

### 6.2 Verificar CI/CD

```bash
# Hacer un cambio de prueba
echo "# Test" >> README.md
git add README.md
git commit -m "Test CI/CD"
git push origin main
```

Luego verifica en GitHub Actions que el deploy se ejecutó correctamente.

## 🐛 Troubleshooting

### Error: "VERCEL_TOKEN not found"
- Verifica que añadiste los secrets en GitHub
- Asegúrate de que los nombres son exactos (mayúsculas)

### Error: "Build failed"
- Verifica que `npm run build` funciona localmente
- Revisa los logs en GitHub Actions

### Error: "Deploy failed"
- Verifica el `vercel.json`
- Asegúrate de que el Output Directory es `dist`

### La página no carga
- Verifica que el `index.html` está en la raíz
- Revisa que las rutas en `vercel.json` son correctas

## 📞 Soporte

Si tienes problemas:

1. Revisa los logs en GitHub Actions
2. Revisa los logs en Vercel Dashboard
3. Consulta la documentación de Vercel: https://vercel.com/docs

## ✅ Checklist Final

- [ ] Repositorio creado en GitHub
- [ ] Código subido a GitHub
- [ ] Secrets configurados en GitHub (VERCEL_TOKEN, VERCEL_ORG_ID, VERCEL_PROJECT_ID)
- [ ] Proyecto importado en Vercel
- [ ] Deploy exitoso
- [ ] Aplicación accesible en la URL de Vercel
- [ ] CI/CD funcionando (push → deploy automático)
- [ ] Auto-Test ejecutado correctamente
- [ ] Todas las 14 pestañas funcionando

---

**¡Felicidades!** Tu SUPERALGORITMO-INTEGRAL v3.0 está ahora desplegado y listo para producción. 🚀
