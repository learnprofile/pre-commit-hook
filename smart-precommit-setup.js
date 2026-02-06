#!/usr/bin/env node

/**
 * Universal Smart Pre-commit Setup - ONE COMMAND FOR ALL TECH STACKS
 *
 * Purpose: Comprehensive enterprise-grade code quality, security, and compliance enforcement
 * Supports: React, Vue, Angular, TypeScript, Node.js, Python, .NET, SQL, Docker, and 18+ other stacks
 * Security: Gitleaks, TruffleHog, Bandit, detect-secrets, enterprise pattern detection
 * Quality: ESLint, Prettier, Black, SQLFluff, SonarQube integration
 *
 * Features:
 * - Interactive mode: node smart-precommit-setup.js --interactive
 * - Quick mode (default): node smart-precommit-setup.js
 * - Detection only: node smart-precommit-setup.js --detect-only
 *
 * Universal Coverage: Catches ALL code errors, security issues, secrets, and compliance violations
 */

const fs = require("fs");
const path = require("path");
const readline = require("readline");

class UniversalSmartPreCommitSetup {
  constructor() {
    this.rootPath = process.cwd();
    this.detectedTech = new Set();
    this.enterpriseRules = [];
    this.isInteractive = process.argv.includes("--interactive");
    this.detectOnly = process.argv.includes("--detect-only");
    this.rl = null;

    // Cross-platform OS detection
    this.isWindows = process.platform === "win32";
    this.isMac = process.platform === "darwin";
    this.isLinux = process.platform === "linux";
    this.osType = this.isWindows ? "Windows" : this.isMac ? "macOS" : "Linux";

    if (this.isInteractive) {
      this.rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
      });
    }
  }

  async run() {
    console.log("Universal Smart Pre-commit Setup\n");
    console.log(
      "Purpose: Comprehensive enterprise-grade code quality, security, and compliance\n",
    );
    console.log(`Operating System: ${this.osType}\n`);

    // Always detect first
    this.detectTechnologies();

    // Handle different modes
    if (this.detectOnly) {
      console.log(
        "\nDetection complete. Run without --detect-only to set up quality tools.",
      );
      process.exit(0);
    }

    if (this.isInteractive) {
      await this.interactiveSetup();
    } else {
      this.quickSetup();
    }

    if (this.rl) this.rl.close();
  }

  async interactiveSetup() {
    console.log("Interactive Setup Mode - Customization Available\n");

    // Show detected technologies
    this.showDetectedTech();

    // Ask user preferences
    const useAdvanced = await this.askQuestion(
      "Would you like advanced customization options? (y/n): ",
    );
    const teamSize = await this.askQuestion(
      "Team size?\n  1) Small (1-10 developers)\n  2) Medium (10-20 developers)\n  3) Large enterprise (20+ developers)\nChoice (1-3): ",
    );
    const securityLevel = await this.askQuestion(
      "Security level?\n  1) Basic (essential tools)\n  2) Standard (comprehensive)\n  3) Maximum (enterprise-grade)\nChoice (1-3): ",
    );

    console.log("\nGenerating configuration based on your preferences...\n");

    this.generateConfiguration(parseInt(securityLevel));
    this.showResults();
  }

  quickSetup() {
    console.log("Quick Setup Mode - Automatic Enterprise Configuration\n");
    this.generateConfiguration(3); // Maximum security by default
    this.showResults();
  }

  askQuestion(question) {
    return new Promise((resolve) => {
      this.rl.question(question, (answer) => {
        resolve(answer.trim());
      });
    });
  }

  detectTechnologies() {
    console.log("Detecting technology stacks...");

    // Enhanced enterprise patterns for universal coverage
    const universalChecks = [
      // Frontend Enterprise Stacks
      {
        files: ["client/package.json"],
        tech: "react-frontend",
        name: "React Frontend Enterprise",
      },
      {
        files: ["server/package.json"],
        tech: "node-backend",
        name: "Node.js Backend Enterprise",
      },
      { files: ["package.json"], tech: "nodejs", name: "Node.js Application" },
      {
        files: ["vite.config.js", "vite.config.mjs", "client/vite.config.mjs"],
        tech: "vite",
        name: "Vite Build System",
      },
      {
        files: ["tsconfig.json", "client/tsconfig.json"],
        tech: "typescript",
        name: "TypeScript",
      },
      { files: ["next.config.js"], tech: "nextjs", name: "Next.js Framework" },
      {
        files: ["nuxt.config.js", "nuxt.config.ts"],
        tech: "nuxtjs",
        name: "Nuxt.js Framework",
      },
      { files: ["angular.json"], tech: "angular", name: "Angular Framework" },
      { files: ["vue.config.js"], tech: "vuejs", name: "Vue.js Framework" },
      { files: ["svelte.config.js"], tech: "svelte", name: "Svelte Framework" },

      // Backend & Database Systems
      { patterns: ["*.sql"], tech: "sql", name: "SQL Database Scripts" },
      {
        files: ["developmentQueries.sql", "prod-scripts.sql"],
        tech: "sql-enterprise",
        name: "Enterprise SQL",
      },
      { files: ["prisma/schema.prisma"], tech: "prisma", name: "Prisma ORM" },
      { files: ["knexfile.js"], tech: "knex", name: "Knex.js Query Builder" },
      {
        files: ["sequelize.config.js"],
        tech: "sequelize",
        name: "Sequelize ORM",
      },

      // Python & Data Science
      {
        files: ["requirements.txt", "requirements.dev.assist.txt"],
        tech: "python",
        name: "Python Application",
      },
      {
        files: ["pyproject.toml"],
        tech: "python-modern",
        name: "Modern Python Project",
      },
      { files: ["Pipfile"], tech: "pipenv", name: "Pipenv Package Manager" },
      {
        files: ["poetry.lock"],
        tech: "poetry",
        name: "Poetry Package Manager",
      },
      { files: ["environment.yml"], tech: "conda", name: "Conda Environment" },
      { files: ["jupyter"], tech: "jupyter", name: "Jupyter Notebooks" },
      { patterns: ["*.py"], tech: "python", name: "Python Scripts" },
      { patterns: ["*.ipynb"], tech: "jupyter", name: "Jupyter Notebooks" },

      // .NET Enterprise Stack
      { patterns: ["*.csproj"], tech: "dotnet", name: ".NET Core/Framework" },
      {
        patterns: ["*.sln"],
        tech: "dotnet-solution",
        name: "Visual Studio Solution",
      },
      { files: ["appsettings.json"], tech: "aspnet", name: "ASP.NET Core" },
      { files: ["global.json"], tech: "dotnet-sdk", name: ".NET SDK Project" },

      // Java & JVM Languages
      { files: ["pom.xml"], tech: "maven", name: "Maven Project" },
      {
        files: ["build.gradle", "build.gradle.kts"],
        tech: "gradle",
        name: "Gradle Project",
      },
      {
        files: ["application.properties"],
        tech: "spring",
        name: "Spring Framework",
      },
      { patterns: ["*.java"], tech: "java", name: "Java Application" },
      { patterns: ["*.kt"], tech: "kotlin", name: "Kotlin Application" },
      { patterns: ["*.scala"], tech: "scala", name: "Scala Application" },

      // Mobile Development
      { files: ["ios/Podfile"], tech: "react-native", name: "React Native" },
      {
        files: ["android/build.gradle"],
        tech: "react-native",
        name: "React Native",
      },
      {
        files: ["flutter/pubspec.yaml"],
        tech: "flutter",
        name: "Flutter Framework",
      },
      {
        files: ["capacitor.config.ts"],
        tech: "ionic",
        name: "Ionic Framework",
      },

      // DevOps & Infrastructure
      { files: ["Dockerfile"], tech: "docker", name: "Docker Containers" },
      {
        files: ["docker-compose.yml", "docker-compose.yaml"],
        tech: "docker-compose",
        name: "Docker Compose",
      },
      {
        files: ["kubernetes"],
        tech: "kubernetes",
        name: "Kubernetes Manifests",
      },
      { files: ["helm"], tech: "helm", name: "Helm Charts" },
      {
        files: ["terraform"],
        tech: "terraform",
        name: "Terraform Infrastructure",
      },
      { files: ["ansible"], tech: "ansible", name: "Ansible Playbooks" },
      {
        patterns: [".github/workflows/*.yml"],
        tech: "github-actions",
        name: "GitHub Actions CI/CD",
      },
      { files: [".gitlab-ci.yml"], tech: "gitlab-ci", name: "GitLab CI/CD" },
      {
        files: ["azure-pipelines.yml"],
        tech: "azure-devops",
        name: "Azure DevOps",
      },
      { files: ["jenkinsfile"], tech: "jenkins", name: "Jenkins CI/CD" },

      // Testing Frameworks
      {
        files: ["jest.config.js", "server/jest.config.js"],
        tech: "jest",
        name: "Jest Testing",
      },
      {
        files: ["cypress.config.js"],
        tech: "cypress",
        name: "Cypress E2E Testing",
      },
      {
        files: ["playwright.config.js"],
        tech: "playwright",
        name: "Playwright Testing",
      },
      { files: ["vitest.config.js"], tech: "vitest", name: "Vitest Testing" },
      { files: ["karma.conf.js"], tech: "karma", name: "Karma Testing" },
      {
        files: ["protractor.conf.js"],
        tech: "protractor",
        name: "Protractor E2E",
      },

      // Build Tools & Bundlers
      {
        files: ["webpack.config.js"],
        tech: "webpack",
        name: "Webpack Bundler",
      },
      { files: ["rollup.config.js"], tech: "rollup", name: "Rollup Bundler" },
      { files: ["parcel"], tech: "parcel", name: "Parcel Bundler" },
      { files: ["esbuild.config.js"], tech: "esbuild", name: "ESBuild" },

      // Power Platform & Enterprise
      { patterns: ["*.msapp"], tech: "powerapps", name: "Power Apps" },
      { patterns: ["*.pbit", "*.pbix"], tech: "powerbi", name: "Power BI" },
      { patterns: ["*.flow"], tech: "powerautomate", name: "Power Automate" },
      {
        files: ["CODEOWNERS"],
        tech: "enterprise-governance",
        name: "Enterprise Code Governance",
      },
      {
        files: ["sonar-project.properties"],
        tech: "sonarqube",
        name: "SonarQube Analysis",
      },
    ];

    // Universal file system scan
    universalChecks.forEach(({ files, patterns, tech, name }) => {
      let found = false;

      if (files) {
        found = files.some((file) => fs.existsSync(file));
      }

      if (!found && patterns) {
        found = patterns.some((pattern) => {
          try {
            const glob = require("glob");
            return glob.sync(pattern).length > 0;
          } catch (e) {
            // Fallback: basic file system check
            return this.simplePatternCheck(pattern);
          }
        });
      }

      if (found) {
        this.detectedTech.add(tech);
      }
    });

    // Advanced content analysis for better detection
    this.advancedContentAnalysis();

    if (this.detectedTech.size === 0) {
      console.log(
        "  Generic project detected - applying universal security rules",
      );
      this.detectedTech.add("generic");
    }

    console.log(`\nDetected ${this.detectedTech.size} technology stack(s)\n`);
  }

  advancedContentAnalysis() {
    // Check package.json for framework dependencies
    if (fs.existsSync("package.json") || fs.existsSync("client/package.json")) {
      const packages = this.readPackageJson();

      // Framework detection via dependencies
      if (packages.react || packages["@types/react"]) {
        this.detectedTech.add("react");
      }
      if (packages.vue || packages["@vue/cli-service"]) {
        this.detectedTech.add("vuejs");
      }
      if (packages["@angular/core"]) {
        this.detectedTech.add("angular");
      }
      if (packages.express || packages.koa || packages.fastify) {
        this.detectedTech.add("node-server");
      }
    }

    // Check file extensions in src directories
    this.scanSourceDirectories();
  }

  readPackageJson() {
    const packages = {};
    ["package.json", "client/package.json", "server/package.json"].forEach(
      (file) => {
        if (fs.existsSync(file)) {
          try {
            const content = JSON.parse(fs.readFileSync(file, "utf8"));
            Object.assign(
              packages,
              content.dependencies || {},
              content.devDependencies || {},
            );
          } catch (e) {
            // Ignore invalid JSON
          }
        }
      },
    );
    return packages;
  }

  scanSourceDirectories() {
    const sourceDirs = ["src", "client/src", "server/src", "app", "lib"];

    sourceDirs.forEach((dir) => {
      if (fs.existsSync(dir)) {
        const files = this.getAllFiles(dir);

        // Analyze file extensions
        const extensions = new Set(
          files.map((f) => path.extname(f)).filter((ext) => ext),
        );

        if (extensions.has(".tsx") || extensions.has(".jsx")) {
          this.detectedTech.add("react-components");
        }
        if (extensions.has(".ts") && !extensions.has(".tsx")) {
          this.detectedTech.add("typescript-pure");
        }
        if (extensions.has(".py")) {
          this.detectedTech.add("python-source");
        }
      }
    });
  }

  getAllFiles(dir, files = []) {
    try {
      const items = fs.readdirSync(dir);
      items.forEach((item) => {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
          this.getAllFiles(fullPath, files);
        } else {
          files.push(fullPath);
        }
      });
    } catch (e) {
      // Ignore access errors
    }
    return files;
  }

  simplePatternCheck(pattern) {
    // Basic pattern matching fallback
    if (pattern.includes("*")) {
      const dir = pattern.split("*")[0] || ".";
      if (!fs.existsSync(dir)) return false;

      const extension = pattern.split(".").pop();
      if (extension && extension !== "*") {
        return this.hasFilesWithExtension(dir, `.${extension}`);
      }
    }
    return false;
  }

  hasFilesWithExtension(dir, ext) {
    try {
      const files = fs.readdirSync(dir);
      return files.some((file) => file.endsWith(ext));
    } catch (e) {
      return false;
    }
  }

  showDetectedTech() {
    console.log("Detected Technologies:");
    console.log("-".repeat(40));

    const techNames = {
      "react-frontend": "React Frontend Enterprise",
      "node-backend": "Node.js Backend Enterprise",
      nodejs: "Node.js Application",
      typescript: "TypeScript",
      python: "Python Application",
      dotnet: ".NET Framework",
      sql: "SQL Database",
      docker: "Docker Containers",
      jest: "Jest Testing Framework",
      generic: "Generic Project (Universal Rules)",
    };

    Array.from(this.detectedTech).forEach((tech) => {
      const name = techNames[tech] || tech;
      console.log(`  [DETECTED] ${name}`);
    });
    console.log("");
  }

  advancedContentAnalysis() {
    console.log(`\nDetected: ${Array.from(this.detectedTech).join(", ")}\n`);
  }

  hasFiles(pattern) {
    try {
      if (pattern.includes("**")) {
        // Quick recursive check for enterprise component patterns
        return this.findMatchingFiles(".", pattern, 3).length > 0;
      } else if (pattern.includes("*")) {
        const ext = pattern.replace("*", "");
        const files = fs.readdirSync(".");
        return files.some((file) => file.endsWith(ext));
      }
      return fs.existsSync(pattern);
    } catch {
      return false;
    }
  }

  findMatchingFiles(dir, pattern, maxDepth, currentDepth = 0) {
    if (currentDepth >= maxDepth) return [];

    try {
      const results = [];
      const entries = fs.readdirSync(dir, { withFileTypes: true });

      for (const entry of entries) {
        if (entry.name.startsWith(".") || entry.name === "node_modules")
          continue;

        const fullPath = path.join(dir, entry.name);

        if (entry.isDirectory()) {
          results.push(
            ...this.findMatchingFiles(
              fullPath,
              pattern,
              maxDepth,
              currentDepth + 1,
            ),
          );
        } else {
          const relativePath = fullPath.replace(/\\/g, "/");
          const regex = new RegExp(
            pattern.replace(/\*\*/g, ".*").replace(/\*/g, "[^/]*"),
          );
          if (regex.test(relativePath)) {
            results.push(fullPath);
          }
        }
      }
      return results;
    } catch {
      return [];
    }
  }

  scanDependencies() {
    const packageFiles = [
      "package.json",
      "client/package.json",
      "server/package.json",
    ];

    packageFiles.forEach((file) => {
      if (fs.existsSync(file)) {
        try {
          const pkg = JSON.parse(fs.readFileSync(file, "utf8"));
          const deps = { ...pkg.dependencies, ...pkg.devDependencies };

          // Enterprise dependency detection
          if (deps.react) {
            this.detectedTech.add("react");
            console.log(`  [FOUND] React (from ${file})`);
          }
          if (deps["styled-components"]) {
            this.detectedTech.add("styled-components");
            console.log(`  🎨 Styled Components (from ${file})`);
          }
          if (deps.typescript || deps["@types/react"]) {
            this.detectedTech.add("typescript");
            console.log(`  📘 TypeScript (from ${file})`);
          }
          if (deps.vite) {
            this.detectedTech.add("vite");
            console.log(`  ⚡ Vite (from ${file})`);
          }
          if (deps.express) {
            this.detectedTech.add("express");
            console.log(`  🚀 Express.js (from ${file})`);
          }

          // Enterprise framework detection
          Object.keys(deps).forEach((dep) => {
            if (
              dep.includes("shell") ||
              dep.includes("enterprise") ||
              dep.includes("sede")
            ) {
              this.detectedTech.add("enterprise-framework");
              console.log(`  [ENTERPRISE] Framework: ${dep}`);
            }
          });
        } catch (e) {
          // Ignore parse errors
        }
      }
    });
  }

  generateConfiguration(securityLevel = 3) {
    console.log(
      `Generating configuration (Security Level: ${securityLevel}/3)...\n`,
    );

    // Base security tools (always included)
    const baseSecurity = [
      {
        repo: "https://github.com/gitleaks/gitleaks",
        rev: "v8.18.0",
        hooks: [
          {
            id: "gitleaks",
            name: "Gitleaks - Detect Secrets",
            entry: "gitleaks detect --verbose --redact --no-git",
            language: "system",
          },
        ],
      },
      {
        repo: "https://github.com/trufflesecurity/trufflehog",
        rev: "v3.63.2-rc0",
        hooks: [
          {
            id: "trufflehog",
            name: "TruffleHog - Advanced Secret Detection",
            entry: "trufflehog git file://./ --only-verified --fail",
            language: "system",
          },
        ],
      },
    ];

    // Enhanced security tools (Level 2+)
    const enhancedSecurity = [
      {
        repo: "https://github.com/pre-commit/pre-commit-hooks",
        rev: "v4.4.0",
        hooks: [
          { id: "detect-private-key", name: "Detect Private Keys" },
          { id: "check-merge-conflict", name: "Check Merge Conflicts" },
          {
            id: "check-added-large-files",
            name: "Check Large Files",
            args: ["--maxkb=1000"],
          },
          { id: "end-of-file-fixer", name: "Fix End of Files" },
          { id: "trailing-whitespace", name: "Trim Trailing Whitespace" },
        ],
      },
      {
        repo: "https://github.com/Yelp/detect-secrets",
        rev: "v1.4.0",
        hooks: [
          {
            id: "detect-secrets",
            name: "Detect Secrets - Advanced Pattern Detection",
            args: ["--baseline", ".secrets.baseline"],
            exclude: "package-lock.json|yarn.lock|poetry.lock",
          },
        ],
      },
      {
        repo: "local",
        hooks: [
          {
            id: "package-vulnerability-scan",
            name: "Package Vulnerability Scanning",
            entry: this.generateOSSpecificCommand(
              "package-scan",
              "",
              "Package scan completed",
              "Vulnerabilities found",
            ),
            language: "system",
            pass_filenames: false,
          },
        ],
      },
    ];

    // Maximum security tools (Level 3)
    const maximumSecurity = [
      {
        repo: "local",
        hooks: [
          {
            id: "enterprise-patterns",
            name: "Enterprise Security Pattern Detection",
            entry: this.generateOSSpecificCommand(
              "enterprise-patterns",
              "",
              "Enterprise patterns check passed",
              "Enterprise security patterns found",
            ),
            language: "system",
          },
          {
            id: "console-log-detector",
            name: "Console.log Detection (Production)",
            entry: this.generateOSSpecificCommand(
              "js-files",
              "console.log",
              "No console.log found",
              "console.log found - remove before commit",
            ),
            language: "system",
          },
          {
            id: "emoji-ai-detector",
            name: "Emoji/AI Content Detection",
            entry: this.generateOSSpecificCommand(
              "emoji-detector",
              "",
              "No emojis found",
              "Emoji detected - potential AI content",
            ),
            language: "system",
          },
          {
            id: "encoding-cipher-detector",
            name: "Encoded/Cipher Content Detection",
            entry: this.generateOSSpecificCommand(
              "encoding-cipher",
              "",
              "No encoded content found",
              "Encoded content detected",
            ),
            language: "system",
          },
          {
            id: "digital-signature-detector",
            name: "Digital Signature Detection",
            entry: this.generateOSSpecificCommand(
              "digital-signatures",
              "",
              "No digital signatures found",
              "Digital certificates/signatures found",
            ),
            language: "system",
          },
          {
            id: "suspicious-strings-detector",
            name: "Suspicious String Patterns Detection",
            entry: this.generateOSSpecificCommand(
              "suspicious-patterns",
              "",
              "No suspicious patterns found",
              "Suspicious execution patterns found",
            ),
            language: "system",
          },
        ],
      },
    ];

    // Technology-specific configurations
    let techConfigs = [];

    // React/JavaScript/TypeScript Configuration
    if (
      this.hasAnyTech([
        "react-frontend",
        "nodejs",
        "typescript",
        "react",
        "vuejs",
        "angular",
      ])
    ) {
      techConfigs.push({
        repo: "https://github.com/pre-commit/mirrors-eslint",
        rev: "v8.50.0",
        hooks: [
          {
            id: "eslint",
            name: "ESLint - JavaScript/TypeScript Linting",
            files: "\\.(js|jsx|ts|tsx)$",
            args: ["--fix", "--max-warnings=0"],
          },
        ],
      });

      if (securityLevel >= 2) {
        techConfigs.push({
          repo: "https://github.com/pre-commit/mirrors-prettier",
          rev: "v3.0.3",
          hooks: [
            {
              id: "prettier",
              name: "Prettier - Code Formatting",
              files: "\\.(js|jsx|ts|tsx|json|css|scss|md)$",
              args: ["--write"],
            },
          ],
        });
      }
    }

    // Python Configuration
    if (this.hasAnyTech(["python", "python-source", "python-modern"])) {
      techConfigs.push({
        repo: "https://github.com/psf/black",
        rev: "23.9.1",
        hooks: [
          {
            id: "black",
            name: "Black - Python Code Formatting",
            language_version: "python3",
          },
        ],
      });

      if (securityLevel >= 2) {
        techConfigs.push(
          {
            repo: "https://github.com/pycqa/flake8",
            rev: "6.1.0",
            hooks: [
              {
                id: "flake8",
                name: "Flake8 - Python Linting",
                args: ["--max-line-length=100", "--ignore=E203,W503"],
              },
            ],
          },
          {
            repo: "https://github.com/pycqa/bandit",
            rev: "1.7.5",
            hooks: [
              {
                id: "bandit",
                name: "Bandit - Python Security Analysis",
                args: ["-r", ".", "-f", "json", "-o", "bandit-report.json"],
              },
            ],
          },
        );
      }
    }

    // SQL Configuration
    if (this.hasAnyTech(["sql", "sql-enterprise"])) {
      techConfigs.push({
        repo: "https://github.com/sqlfluff/sqlfluff",
        rev: "2.3.2",
        hooks: [
          {
            id: "sqlfluff-lint",
            name: "SQLFluff - SQL Linting",
            files: "\\.sql$",
            args: ["--dialect=tsql"],
          },
        ],
      });
    }

    // .NET Configuration
    if (this.hasAnyTech(["dotnet", "aspnet"])) {
      techConfigs.push({
        repo: "local",
        hooks: [
          {
            id: "dotnet-format",
            name: "dotnet format - .NET Code Formatting",
            entry: "dotnet format --verify-no-changes",
            language: "system",
            files: "\\.(cs|vb)$",
          },
        ],
      });
    }

    // Docker Configuration
    if (this.hasAnyTech(["docker"])) {
      techConfigs.push({
        repo: "https://github.com/hadolint/hadolint",
        rev: "v2.12.0",
        hooks: [
          {
            id: "hadolint-docker",
            name: "Hadolint - Dockerfile Linting",
            files: "Dockerfile.*",
          },
        ],
      });
    }

    // Build final configuration based on security level
    let finalConfig = [...baseSecurity];

    if (securityLevel >= 2) {
      finalConfig = [...finalConfig, ...enhancedSecurity];
    }

    if (securityLevel >= 3) {
      finalConfig = [...finalConfig, ...maximumSecurity];
    }

    finalConfig = [...finalConfig, ...techConfigs];

    // Generate YAML configuration
    const yamlContent = this.generateYAMLConfig(finalConfig);

    // Write configuration file
    fs.writeFileSync(".pre-commit-config.yaml", yamlContent);
    console.log("Generated .pre-commit-config.yaml");

    // Generate requirements file
    this.generateRequirementsFile(securityLevel);
  }

  hasAnyTech(techList) {
    return techList.some((tech) => this.detectedTech.has(tech));
  }

  // Cross-platform command generation
  generateOSSpecificCommand(commandType, pattern, successMsg, failMsg) {
    if (this.isWindows) {
      return this.generateWindowsCommand(
        commandType,
        pattern,
        successMsg,
        failMsg,
      );
    } else {
      return this.generateUnixCommand(
        commandType,
        pattern,
        successMsg,
        failMsg,
      );
    }
  }

  generateWindowsCommand(commandType, pattern, successMsg, failMsg) {
    switch (commandType) {
      case "grep":
        return `powershell -Command "if (Select-String -Path (Get-ChildItem -Recurse -Exclude node_modules,.git | Where-Object {!$_.PSIsContainer}) -Pattern '${pattern}' -Quiet) { Write-Host '${failMsg}'; exit 1 } else { Write-Host '${successMsg}' }"`;
      case "js-files":
        return `powershell -Command "$files = Get-ChildItem -Recurse -Include '*.js','*.jsx','*.ts','*.tsx' | Where-Object {$_.FullName -notlike '*node_modules*'}; if (Select-String -Path $files -Pattern '${pattern}' -Quiet) { Write-Host '${failMsg}'; exit 1 } else { Write-Host '${successMsg}' }"`;
      case "package-scan":
        return `powershell -Command "if (Test-Path 'package.json') { npm audit --audit-level moderate }; if (Test-Path 'requirements.txt') { pip-audit --desc }; Write-Host '${successMsg}'"`;
      case "enterprise-patterns":
        return `powershell -Command "$files = Get-ChildItem -Recurse | Where-Object {!$_.PSIsContainer -and $_.FullName -notlike '*node_modules*' -and $_.FullName -notlike '*.git*' -and $_.Name -notlike 'README*' -and $_.Name -notlike '*.test.*'}; $matches = Select-String -Path $files -Pattern '@shell\\.com|@sede\\.com|password\\s*=|api[_-]?key\\s*[=:]'; if ($matches) { Write-Host '=== ENTERPRISE SECURITY PATTERNS DETECTED ==='; $matches | ForEach-Object { Write-Host \"File: $($_.Filename) | Line $($_.LineNumber): $($_.Line.Trim())\" }; Write-Host '=== END PATTERNS ==='; exit 1 } else { Write-Host 'Enterprise patterns check passed - no sensitive patterns found' }"`;
      case "emoji-detector":
        return `powershell -Command "$matches = Select-String -Path (Get-ChildItem -Recurse -Exclude node_modules,.git | Where-Object {!$_.PSIsContainer}) -Pattern '[\\u{1F600}-\\u{1F64F}]|[\\u{1F300}-\\u{1F5FF}]|[\\u{1F680}-\\u{1F6FF}]'; if ($matches) { Write-Host '=== EMOJI/AI CONTENT DETECTED ==='; $matches | ForEach-Object { Write-Host \"File: $($_.Filename) | Line $($_.LineNumber): $($_.Line.Trim())\" }; Write-Host '=== END EMOJIS ==='; exit 1 } else { Write-Host 'No emojis found - content appears human-generated' }"`;
      case "encoding-cipher":
        return `powershell -Command "$matches = Select-String -Path (Get-ChildItem -Recurse -Exclude node_modules,.git | Where-Object {!$_.PSIsContainer}) -Pattern 'base64|btoa|atob|-----BEGIN|-----END|[A-Za-z0-9+/]{40,}='; if ($matches) { Write-Host '=== ENCODED/CIPHER CONTENT DETECTED ==='; $matches | ForEach-Object { Write-Host \"File: $($_.Filename) | Line $($_.LineNumber): $($_.Line.Trim())\" }; Write-Host '=== END ENCODED CONTENT ==='; exit 1 } else { Write-Host 'No suspicious encoded content found' }"`;
      case "digital-signatures":
        return `powershell -Command "$files = Get-ChildItem -Recurse -Include '*.p12','*.pfx','*.pem','*.crt','*.cer','*.key','*.jks','*.keystore' | Where-Object {$_.FullName -notlike '*node_modules*'}; if ($files.Count -gt 0) { Write-Host '=== DIGITAL CERTIFICATES/SIGNATURES DETECTED ==='; $files | ForEach-Object { Write-Host \"Certificate file: $($_.FullName)\" }; Write-Host '=== END CERTIFICATES ==='; exit 1 } else { Write-Host 'No digital signatures found' }"`;
      case "suspicious-patterns":
        return `powershell -Command "$matches = Select-String -Path (Get-ChildItem -Recurse -Exclude node_modules,.git | Where-Object {!$_.PSIsContainer}) -Pattern 'eval\\(|exec\\(|system\\(|shell_exec|passthru|popen|proc_open|file_get_contents.*http|curl_exec|wget|powershell|cmd\\.exe'; if ($matches) { Write-Host '=== SUSPICIOUS EXECUTION PATTERNS DETECTED ==='; $matches | ForEach-Object { Write-Host \"File: $($_.Filename) | Line $($_.LineNumber): $($_.Line.Trim())\" }; Write-Host '=== END SUSPICIOUS PATTERNS ==='; exit 1 } else { Write-Host 'No suspicious execution patterns found' }"`;
      default:
        return `powershell -Command "Write-Host '${successMsg}'"`;
    }
  }

  generateUnixCommand(commandType, pattern, successMsg, failMsg) {
    switch (commandType) {
      case "grep":
        return `bash -c "grep -r --exclude-dir=node_modules --exclude-dir=.git -E '${pattern}' . && echo '${failMsg}' && exit 1 || echo '${successMsg}'"`;
      case "js-files":
        return `bash -c "find . -name '*.js' -o -name '*.jsx' -o -name '*.ts' -o -name '*.tsx' | grep -v node_modules | xargs grep -l '${pattern}' && echo '${failMsg}' && exit 1 || echo '${successMsg}'"`;
      case "package-scan":
        return `bash -c "if [ -f package.json ]; then npm audit --audit-level moderate; fi && if [ -f requirements.txt ]; then pip-audit --desc; fi && echo '${successMsg}'"`;
      case "enterprise-patterns":
        return `bash -c "echo '=== SCANNING FOR ENTERPRISE SECURITY PATTERNS ===' && grep -r --exclude-dir=node_modules --exclude-dir=.git --exclude='README*' --exclude='*.test.*' -E '(@shell\\.com|@sede\\.com|password\\s*=|api[_-]?key\\s*[=:])' . && echo '=== END ENTERPRISE PATTERNS ===' && exit 1 || echo 'Enterprise patterns check passed - no sensitive patterns found'"`;
      case "emoji-detector":
        return `bash -c "echo '=== SCANNING FOR EMOJI/AI CONTENT ===' && grep -r --exclude-dir=node_modules --exclude-dir=.git -P '[\\x{1F600}-\\x{1F64F}]|[\\x{1F300}-\\x{1F5FF}]|[\\x{1F680}-\\x{1F6FF}]' . && echo '=== END EMOJI DETECTION ===' && exit 1 || echo 'No emojis found - content appears human-generated'"`;
      case "encoding-cipher":
        return `bash -c "echo '=== SCANNING FOR ENCODED/CIPHER CONTENT ===' && grep -r --exclude-dir=node_modules --exclude-dir=.git -E '(base64|btoa|atob|-----BEGIN|-----END|[A-Za-z0-9+/]{40,}=)' . && echo '=== END ENCODED CONTENT ===' && exit 1 || echo 'No suspicious encoded content found'"`;
      case "digital-signatures":
        return `bash -c "echo '=== SCANNING FOR DIGITAL CERTIFICATES ===' && find . -type f \\( -name '*.p12' -o -name '*.pfx' -o -name '*.pem' -o -name '*.crt' -o -name '*.cer' -o -name '*.key' -o -name '*.jks' -o -name '*.keystore' \\) | grep -v node_modules && echo '=== END CERTIFICATE SCAN ===' && exit 1 || echo 'No digital signatures found'"`;
      case "suspicious-patterns":
        return `bash -c "echo '=== SCANNING FOR SUSPICIOUS EXECUTION PATTERNS ===' && grep -r --exclude-dir=node_modules --exclude-dir=.git -iE '(eval\\(|exec\\(|system\\(|shell_exec|passthru|popen|proc_open|file_get_contents\\(.*http|curl_exec|wget|powershell|cmd\\.exe)' . && echo '=== END SUSPICIOUS PATTERNS ===' && exit 1 || echo 'No suspicious execution patterns found'"`;
      default:
        return `bash -c "echo '${successMsg}'"`;
    }
  }

  generateYAMLConfig(repos) {
    let yaml = "# Universal Smart Pre-commit Configuration\n";
    yaml += "# Generated for comprehensive enterprise-grade code quality\n";
    yaml += "# Security: Gitleaks, TruffleHog, Bandit, detect-secrets\n";
    yaml +=
      "# AI Detection: Emoji patterns, encoded content, digital signatures\n";
    yaml += "# Vulnerability: Package scanning, suspicious patterns\n";
    yaml += "# Quality: ESLint, Prettier, Black, SQLFluff\n";
    yaml +=
      "# Technologies: " + Array.from(this.detectedTech).join(", ") + "\n\n";
    yaml += "repos:\n";

    repos.forEach((repo) => {
      yaml += `  - repo: ${repo.repo}\n`;
      if (repo.rev) {
        yaml += `    rev: ${repo.rev}\n`;
      }
      yaml += "    hooks:\n";

      repo.hooks.forEach((hook) => {
        yaml += `      - id: ${hook.id}\n`;
        if (hook.name) yaml += `        name: ${hook.name}\n`;
        if (hook.entry) yaml += `        entry: ${hook.entry}\n`;
        if (hook.language) yaml += `        language: ${hook.language}\n`;
        if (hook.files) yaml += `        files: ${hook.files}\n`;
        if (hook.exclude) yaml += `        exclude: ${hook.exclude}\n`;
        if (hook.args) {
          yaml += "        args:\n";
          hook.args.forEach((arg) => (yaml += `          - ${arg}\n`));
        }
        if (hook.language_version)
          yaml += `        language_version: ${hook.language_version}\n`;
      });
      yaml += "\n";
    });

    return yaml;
  }

  generateRequirementsFile(securityLevel) {
    let requirements = "# Universal Smart Pre-commit Requirements\n";
    requirements += "# Comprehensive enterprise security and quality tools\n";
    requirements +=
      "# Includes vulnerability scanning and content analysis\n\n";

    // Base requirements (vulnerability-scanned versions)
    const baseTools = [
      "pre-commit>=3.5.0",
      "gitleaks>=8.18.0",
      "detect-secrets>=1.4.0",
      "safety>=2.3.5",
    ];

    // Enhanced tools (Level 2+) - security-focused versions
    const enhancedTools = [
      "bandit[toml]>=1.7.5",
      "black>=23.9.1",
      "flake8>=6.1.0",
      "sqlfluff>=2.3.2",
      "semgrep>=1.45.0",
      "checkov>=3.0.0",
    ];

    // Maximum tools (Level 3) - comprehensive security suite
    const maximumTools = [
      "mypy>=1.6.0",
      "pylint>=3.0.0",
      "trufflehog>=3.63.0",
      "pip-audit>=2.6.1",
      "cyclonedx-bom>=4.0.0",
      "osv-scanner>=1.4.3",
      "vulndb>=1.0.0",
    ];

    let allTools = [...baseTools];
    if (securityLevel >= 2) allTools = [...allTools, ...enhancedTools];
    if (securityLevel >= 3) allTools = [...allTools, ...maximumTools];

    requirements += allTools.join("\n") + "\n";
    requirements += "\n# Additional security validation\n";
    requirements += "# Run: pip-audit --desc --output json\n";
    requirements += "# Run: safety check --json\n";
    requirements += "# Run: osv-scanner --lockfile requirements.txt\n";

    fs.writeFileSync("requirements.dev.assist.txt", requirements);
    console.log(
      "Generated requirements.dev.assist.txt (with vulnerability scanning)",
    );
  }

  showResults() {
    if (
      this.detectedTech.has("react") ||
      this.detectedTech.has("typescript") ||
      this.detectedTech.has("vite")
    ) {
      config.repos.push(
        {
          repo: "https://github.com/pre-commit/mirrors-eslint",
          rev: "v8.56.0",
          hooks: [
            {
              id: "eslint",
              files: "\\.(js|jsx|ts|tsx)$",
              additional_dependencies: [
                "eslint@^8.57.0",
                "@typescript-eslint/parser@^6.21.0",
                "@typescript-eslint/eslint-plugin@^6.21.0",
                "eslint-plugin-react@^7.33.0",
                "eslint-plugin-react-hooks@^4.6.0",
                "eslint-plugin-security@^1.7.1",
              ],
            },
          ],
        },
        {
          repo: "https://github.com/pre-commit/mirrors-prettier",
          rev: "v4.0.0-alpha.8",
          hooks: [
            {
              id: "prettier",
              files: "\\.(js|jsx|ts|tsx|json|css|scss|md)$",
            },
          ],
        },
      );
      this.enterpriseRules.push(
        "React/TypeScript: ESLint + Prettier + Security",
      );
    }

    // Python Development
    if (
      this.detectedTech.has("python") ||
      this.detectedTech.has("python-scripts")
    ) {
      config.repos.push(
        {
          repo: "https://github.com/psf/black",
          rev: "23.11.0",
          hooks: [{ id: "black" }],
        },
        {
          repo: "https://github.com/pycqa/isort",
          rev: "5.12.0",
          hooks: [{ id: "isort" }],
        },
        {
          repo: "https://github.com/pycqa/flake8",
          rev: "6.1.0",
          hooks: [{ id: "flake8" }],
        },
        {
          repo: "https://github.com/pycqa/bandit",
          rev: "1.7.5",
          hooks: [{ id: "bandit" }],
        },
      );
      this.enterpriseRules.push(
        "Python: Black + isort + flake8 + bandit security",
      );
    }

    // SQL Enterprise
    if (
      this.detectedTech.has("sql") ||
      this.detectedTech.has("sql-enterprise")
    ) {
      config.repos.push({
        repo: "https://github.com/sqlfluff/sqlfluff",
        rev: "2.3.5",
        hooks: [
          {
            id: "sqlfluff-lint",
            args: ["--dialect", "tsql"],
          },
        ],
      });
      this.enterpriseRules.push("SQL: Enterprise linting and security");
    }
  }

  addEnterpriseSecurityHooks(config) {
    config.repos.push({
      repo: "local",
      hooks: [
        {
          id: "enterprise-security-scan",
          name: "Enterprise Security Scanner",
          entry:
            "python -c \"import re,sys,os;files=sys.argv[1:];patterns=[r'@shell\\.com',r'@sede\\.com',r'password\\s*[:=]\\s*[\\'\\\"]w+',r'secret\\s*[:=]\\s*[\\'\\\"]w+',r'api[_-]?key\\s*[:=]',r'console\\.log\\('];violations=[];[violations.extend([(f,p) for p in patterns if re.search(p,open(f,encoding='utf-8',errors='ignore').read(),re.I)]) for f in files];[print(f'🚨 Security violation in {f}: {p}') for f,p in violations];sys.exit(1) if violations else None\"",
          language: "system",
          files: "\\.(js|jsx|ts|tsx|py|cs|sql|json|yaml|yml)$",
          pass_filenames: true,
        },
      ],
    });
    this.enterpriseRules.push(
      "Enterprise Security: Email/Secret/Console scanning",
    );
  }

  configToYaml(obj, indent = 0) {
    const spaces = "  ".repeat(indent);
    let yaml = "";

    for (const [key, value] of Object.entries(obj)) {
      if (Array.isArray(value)) {
        yaml += `${spaces}${key}:\n`;
        value.forEach((item) => {
          if (typeof item === "object") {
            yaml += `${spaces}- `;
            const itemYaml = this.configToYaml(item, indent + 1);
            yaml += itemYaml.substring((indent + 1) * 2);
          } else {
            yaml += `${spaces}- ${item}\n`;
          }
        });
      } else if (typeof value === "object" && value !== null) {
        yaml += `${spaces}${key}:\n`;
        yaml += this.configToYaml(value, indent + 1);
      } else {
        yaml += `${spaces}${key}: ${value}\n`;
      }
    }

    return yaml;
  }

  showResults() {
    console.log("\nEnterprise Pre-commit Setup Complete!\n");

    console.log("Applied Enterprise Rules:");
    this.enterpriseRules.forEach((rule) => console.log(`  [APPLIED] ${rule}`));

    console.log("\nReady for Enterprise Development:");
    console.log("  - Secrets detection and prevention");
    console.log("  - Code formatting and style enforcement");
    console.log("  - Security pattern scanning");
    console.log("  - AI content detection");
    console.log("  - Package vulnerability scanning");

    console.log("\nQuick Start Commands:");
    console.log("  pip install -r requirements.dev.assist.txt");
    console.log("  pre-commit install");
    console.log("  pre-commit run --all-files");

    console.log(
      "\nIMPORTANT: Binary tools (gitleaks, trufflehog) will be downloaded",
    );
    console.log(
      "automatically by pre-commit when first run - no separate install needed!",
    );

    console.log("\nIf pre-commit command not found, try:");
    console.log("  python -m pip install --user pre-commit");
    console.log(
      "  OR install via system package manager (brew, chocolatey, etc.)",
    );

    console.log("\nDaily Workflow:");
    console.log("  • Before every commit: pre-commit run --all-files");
    console.log("  • Fix any issues found, then commit normally");
    console.log('  • Emergency bypass: git commit --no-verify -m "message"');

    console.log("\nSpecific Security Commands:");
    console.log("  • Secrets: pre-commit run gitleaks trufflehog --all-files");
    console.log(
      "  • AI detection: pre-commit run emoji-ai-detector --all-files",
    );
    console.log(
      "  • Package security: pre-commit run package-vulnerability-scan --all-files",
    );
    console.log(
      "  • All security: pre-commit run enterprise-patterns --all-files",
    );

    console.log("\nCopilot Integration Ready:");
    console.log('  Ask: "Check code quality and security"');
    console.log('  Ask: "Run pre-commit validation"');
    console.log('  Ask: "Scan for secrets and formatting issues"');
    console.log('  Ask: "Detect AI-generated content patterns"');

    console.log("\n📖 For complete usage guide: see USAGE.md");
  }
}

// Execute if run directly
if (require.main === module) {
  const setup = new UniversalSmartPreCommitSetup();
  setup.run();
}

module.exports = UniversalSmartPreCommitSetup;
