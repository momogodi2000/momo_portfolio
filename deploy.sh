# deploy.sh - Automated deployment script
#!/bin/bash

set -e

echo "🚀 Starting deployment process..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="momo-yvan-portfolio"
BUILD_DIR="dist"
BACKUP_DIR="backup-$(date +%Y%m%d-%H%M%S)"

# Functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Pre-deployment checks
check_prerequisites() {
    log_info "Checking prerequisites..."
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed"
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed"
        exit 1
    fi
    
    # Check Git
    if ! command -v git &> /dev/null; then
        log_error "Git is not installed"
        exit 1
    fi
    
    log_success "All prerequisites are met"
}

# Install dependencies
install_dependencies() {
    log_info "Installing dependencies..."
    npm ci --production=false
    log_success "Dependencies installed"
}

# Run tests
run_tests() {
    log_info "Running tests..."
    if npm run test --if-present; then
        log_success "All tests passed"
    else
        log_warning "Tests failed or not configured"
    fi
}

# Build the project
build_project() {
    log_info "Building project..."
    
    # Clean previous build
    if [ -d "$BUILD_DIR" ]; then
        rm -rf "$BUILD_DIR"
    fi
    
    # Build
    npm run build
    
    if [ -d "$BUILD_DIR" ]; then
        log_success "Build completed successfully"
    else
        log_error "Build failed"
        exit 1
    fi
}

# Optimize assets
optimize_assets() {
    log_info "Optimizing assets..."
    
    # Compress images (if imagemin is available)
    if command -v imagemin &> /dev/null; then
        find "$BUILD_DIR" -name "*.png" -o -name "*.jpg" -o -name "*.jpeg" | xargs imagemin --replace
        log_success "Images optimized"
    fi
    
    # Gzip compression
    find "$BUILD_DIR" -type f \( -name "*.js" -o -name "*.css" -o -name "*.html" \) -exec gzip -k {} \;
    log_success "Assets compressed"
}

# Deploy to different platforms
deploy_vercel() {
    log_info "Deploying to Vercel..."
    
    if command -v vercel &> /dev/null; then
        vercel --prod --yes
        log_success "Deployed to Vercel"
    else
        log_error "Vercel CLI not installed"
        exit 1
    fi
}

deploy_netlify() {
    log_info "Deploying to Netlify..."
    
    if command -v netlify &> /dev/null; then
        netlify deploy --prod --dir="$BUILD_DIR"
        log_success "Deployed to Netlify"
    else
        log_error "Netlify CLI not installed"
        exit 1
    fi
}

deploy_github_pages() {
    log_info "Deploying to GitHub Pages..."
    
    # Build for GitHub Pages
    VITE_BASE_URL="/$(basename "$PWD")/" npm run build
    
    # Deploy
    npm run deploy
    log_success "Deployed to GitHub Pages"
}

deploy_ftp() {
    log_info "Deploying via FTP..."
    
    # FTP configuration (set these environment variables)
    FTP_SERVER=${FTP_SERVER}
    FTP_USERNAME=${FTP_USERNAME}
    FTP_PASSWORD=${FTP_PASSWORD}
    FTP_REMOTE_DIR=${FTP_REMOTE_DIR:-"/public_html"}
    
    if [ -z "$FTP_SERVER" ] || [ -z "$FTP_USERNAME" ] || [ -z "$FTP_PASSWORD" ]; then
        log_error "FTP credentials not configured"
        exit 1
    fi
    
    # Use lftp for deployment
    if command -v lftp &> /dev/null; then
        lftp -c "
            set ftp:list-options -a;
            set ftp:ssl-allow no;
            open ftp://$FTP_SERVER;
            user $FTP_USERNAME $FTP_PASSWORD;
            lcd $BUILD_DIR;
            cd $FTP_REMOTE_DIR;
            mirror --reverse --delete --verbose
        "
        log_success "Deployed via FTP"
    else
        log_error "lftp not installed"
        exit 1
    fi
}

# Generate sitemap
generate_sitemap() {
    log_info "Generating sitemap..."
    
    cat > "$BUILD_DIR/sitemap.xml" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
        <loc>https://momoyvan.github.io/portfolio/</loc>
        <lastmod>$(date -I)</lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>
    <url>
        <loc>https://momoyvan.github.io/portfolio/#about</loc>
        <lastmod>$(date -I)</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://momoyvan.github.io/portfolio/#projects</loc>
        <lastmod>$(date -I)</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>
    <url>
        <loc>https://momoyvan.github.io/portfolio/#blog</loc>
        <lastmod>$(date -I)</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>
    <url>
        <loc>https://momoyvan.github.io/portfolio/#contact</loc>
        <lastmod>$(date -I)</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>
</urlset>
EOF
    
    log_success "Sitemap generated"
}

# Create robots.txt
create_robots_txt() {
    log_info "Creating robots.txt..."
    
    cat > "$BUILD_DIR/robots.txt" << EOF
User-agent: *
Allow: /
Sitemap: https://momoyvan.github.io/portfolio/sitemap.xml

# Block access to admin areas
Disallow: /admin/
Disallow: /.git/
Disallow: /node_modules/
EOF
    
    log_success "robots.txt created"
}

# Security headers
add_security_headers() {
    log_info "Adding security headers..."
    
    # Create .htaccess for Apache servers
    cat > "$BUILD_DIR/.htaccess" << EOF
# Security Headers
Header always set X-Content-Type-Options nosniff
Header always set X-Frame-Options DENY
Header always set X-XSS-Protection "1; mode=block"
Header always set Referrer-Policy "strict-origin-when-cross-origin"
Header always set Permissions-Policy "camera=(), microphone=(), geolocation=()"

# HSTS (HTTP Strict Transport Security)
Header always set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"

# Content Security Policy
Header always set Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com"

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>

# Cache static assets
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType text/css "access plus 1 year"
    ExpiresByType application/javascript "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/gif "access plus 1 year"
    ExpiresByType image/svg+xml "access plus 1 year"
    ExpiresByType font/woff "access plus 1 year"
    ExpiresByType font/woff2 "access plus 1 year"
</IfModule>

# Redirect HTTP to HTTPS
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
EOF
    
    # Create _headers for Netlify
    cat > "$BUILD_DIR/_headers" << EOF
/*
  X-Frame-Options: DENY
  X-XSS-Protection: 1; mode=block
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

/sw.js
  Cache-Control: no-cache

/*.js
  Cache-Control: public, max-age=31536000

/*.css
  Cache-Control: public, max-age=31536000

/*.png
  Cache-Control: public, max-age=31536000

/*.jpg
  Cache-Control: public, max-age=31536000

/*.svg
  Cache-Control: public, max-age=31536000
EOF
    
    log_success "Security headers added"
}

# Performance audit
run_performance_audit() {
    log_info "Running performance audit..."
    
    if command -v lighthouse &> /dev/null; then
        lighthouse https://localhost:4173 --output json --output-path ./lighthouse-report.json --chrome-flags="--headless"
        log_success "Performance audit completed"
    else
        log_warning "Lighthouse not installed, skipping performance audit"
    fi
}

# Backup current deployment
backup_current() {
    if [ -d "$BUILD_DIR" ]; then
        log_info "Creating backup..."
        cp -r "$BUILD_DIR" "$BACKUP_DIR"
        log_success "Backup created: $BACKUP_DIR"
    fi
}

# Main deployment function
main() {
    echo "🎯 Deploying $PROJECT_NAME"
    echo "📅 $(date)"
    echo "👤 $(whoami)"
    echo "🌿 $(git branch --show-current)"
    echo "📝 $(git rev-parse --short HEAD)"
    echo ""
    
    # Parse command line arguments
    PLATFORM=${1:-"github"}
    
    case $PLATFORM in
        "vercel")
            deploy_function=deploy_vercel
            ;;
        "netlify")
            deploy_function=deploy_netlify
            ;;
        "github")
            deploy_function=deploy_github_pages
            ;;
        "ftp")
            deploy_function=deploy_ftp
            ;;
        *)
            log_error "Unknown platform: $PLATFORM"
            echo "Usage: $0 [vercel|netlify|github|ftp]"
            exit 1
            ;;
    esac
    
    # Execute deployment steps
    check_prerequisites
    backup_current
    install_dependencies
    run_tests
    build_project
    optimize_assets
    generate_sitemap
    create_robots_txt
    add_security_headers
    $deploy_function
    run_performance_audit
    
    log_success "🎉 Deployment completed successfully!"
    log_info "📊 Build size: $(du -sh $BUILD_DIR | cut -f1)"
    log_info "🔗 Platform: $PLATFORM"
    
    # Clean up old backups (keep last 5)
    ls -1t backup-* 2>/dev/null | tail -n +6 | xargs -r rm -rf
}

# Run main function
main "$@"

# package.json scripts section additions
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "deploy": "npm run build && gh-pages -d dist",
    "deploy:vercel": "./deploy.sh vercel",
    "deploy:netlify": "./deploy.sh netlify", 
    "deploy:github": "./deploy.sh github",
    "deploy:ftp": "./deploy.sh ftp",
    "analyze": "npm run build && npx vite-bundle-analyzer",
    "lighthouse": "npm run build && npm run preview & sleep 5 && lighthouse http://localhost:4173 --output html --output-path ./lighthouse-report.html && kill %1",
    "test:e2e": "playwright test",
    "test:unit": "vitest",
    "format": "prettier --write src/",
    "lint": "eslint src/ --fix",
    "type-check": "tsc --noEmit",
    "pre-commit": "npm run lint && npm run type-check && npm run test:unit",
    "clean": "rm -rf dist node_modules/.cache .vite",
    "setup": "npm install && npx husky install"
  }
}

# .github/workflows/deploy.yml - GitHub Actions
name: Deploy Portfolio

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v4
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        
    - name: Install dependencies
      run: npm ci
      
    - name: Run tests
      run: npm run test --if-present
      
    - name: Build
      run: npm run build
      env:
        VITE_GA_ID: ${{ secrets.GA_ID }}
        VITE_HOTJAR_ID: ${{ secrets.HOTJAR_ID }}
      
    - name: Deploy to GitHub Pages
      if: github.ref == 'refs/heads/main'
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
        
    - name: Deploy to Vercel
      if: github.ref == 'refs/heads/main'
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
        vercel-args: '--prod'
        
    - name: Lighthouse CI
      uses: treosh/lighthouse-ci-action@v9
      with:
        configPath: './lighthouserc.json'
        uploadArtifacts: true
        temporaryPublicStorage: true

# lighthouserc.json - Lighthouse CI configuration
{
  "ci": {
    "collect": {
      "url": ["http://localhost:4173"],
      "startServerCommand": "npm run preview",
      "numberOfRuns": 3
    },
    "assert": {
      "assertions": {
        "categories:performance": ["warn", {"minScore": 0.8}],
        "categories:accessibility": ["error", {"minScore": 0.9}],
        "categories:best-practices": ["warn", {"minScore": 0.8}],
        "categories:seo": ["error", {"minScore": 0.9}],
        "categories:pwa": ["warn", {"minScore": 0.7}]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}

# Dockerfile - For containerized deployment
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Add security headers
RUN echo 'add_header X-Frame-Options DENY always;' > /etc/nginx/conf.d/security.conf && \
    echo 'add_header X-Content-Type-Options nosniff always;' >> /etc/nginx/conf.d/security.conf && \
    echo 'add_header X-XSS-Protection "1; mode=block" always;' >> /etc/nginx/conf.d/security.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# nginx.conf
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    
    # Gzip compression
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_types
        text/plain
        text/css
        text/xml
        text/javascript
        application/javascript
        application/xml+rss
        application/json;
    
    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;
        
        # Security headers
        include /etc/nginx/conf.d/security.conf;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
        
        # Handle SPA routing
        location / {
            try_files $uri $uri/ /index.html;
        }
        
        # Health check
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }
    }
}

# docker-compose.yml
version: '3.8'

services:
  portfolio:
    build: .
    ports:
      - "80:80"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
    
  # Optional: Add monitoring
  monitoring:
    image: prom/prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml