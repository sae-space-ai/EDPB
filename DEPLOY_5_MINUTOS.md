# 🚀 DESPLIEGUE EN 5 MINUTOS - GUÍA ULTRA SIMPLE

## ⚡ MÉTODO 1: VERCEL UI (EL MÁS FÁCIL - 2 MINUTOS)

### Paso 1: Ve a Vercel
```
https://vercel.com/new
```

### Paso 2: Importa desde GitHub
- Si ya tienes el repo en GitHub: selecciónalo
- Si no: sube los archivos manualmente (drag & drop)

### Paso 3: Configura
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`

### Paso 4: Click en "Deploy"
- Espera 2-3 minutos
- ¡Listo! Tendrás tu URL

---

## ⚡ MÉTODO 2: CLI (5 MINUTOS)

### Paso 1: Instala Vercel CLI
```bash
npm install -g vercel
```

### Paso 2: Login
```bash
vercel login
```

### Paso 3: Deploy
```bash
vercel --prod
```

### Paso 4: Sigue las instrucciones
- Nombre del proyecto: `edpb-backend`
- Directorio: `.`
- Override settings: No

---

## ⚡ MÉTODO 3: GITHUB + VERCEL (COMPLETO - 10 MINUTOS)

### Paso 1: Crea repo en GitHub
```
https://github.com/new
```
- Nombre: `edpb-backend`
- Público
- NO inicializar con README

### Paso 2: Sube el código
```bash
git init
git add .
git commit -m "🎉 MVP: EDPB Super Ecosystem v5.0"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/edpb-backend.git
git push -u origin main
```

### Paso 3: Conecta con Vercel
```
https://vercel.com/new
```
- Importa tu repo de GitHub
- Deploy automático

---

## 📋 VERIFICACIÓN POST-DEPLOY

Una vez desplegado, verifica:

```bash
# Reemplaza con tu URL real
PROD_URL="https://tu-proyecto.vercel.app"

# Test endpoints
curl "$PROD_URL/api/status"
curl "$PROD_URL/api/health"
curl "$PROD_URL/api/components"
```

---

## 🎯 RESUMEN

| Método | Tiempo | Dificultad |
|--------|--------|------------|
| Vercel UI | 2 min | ⭐ Muy fácil |
| Vercel CLI | 5 min | ⭐⭐ Fácil |
| GitHub + Vercel | 10 min | ⭐⭐⭐ Medio |

**Recomendación:** Usa el **Método 1 (Vercel UI)** si es tu primera vez.

---

## 📞 SI TIENES PROBLEMAS

1. **Error de build:** Verifica que `npm run build` funciona localmente
2. **Error de deploy:** Revisa los logs en Vercel Dashboard
3. **Error de GitHub:** Verifica que tienes permisos de push

---

## ✅ CHECKLIST FINAL

- [ ] Proyecto desplegado en Vercel
- [ ] URL de producción accesible
- [ ] `/api/status` responde con JSON
- [ ] Frontend carga correctamente
- [ ] Iconos EU AI visibles
- [ ] Declaración MVP visible

---

**¡Eso es todo! Tu proyecto estará en la nube en 2-10 minutos.**
