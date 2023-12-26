# PowerShell

# Check if arguments are provided
if ($args.Length -eq 0) {
    Write-Host "No arguments provided. Aborting."
    exit
}

$projectName = $args[0]
Write-Host "The project will be named $projectName"

# Create next application
pnpm create next-app $projectName --typescript --tailwind --no-eslint --src-dir --app --use-pnpm --import-alias "@/*"

Set-Location -Path $projectName

# VARIABLES
# ----------------------------------------------------------------------------------------------------------------------
$currentDirectory = Get-Location
Write-Host "The current directory is $currentDirectory"

$tab = "   "

# Templates
$templatesDirectory = "C:\Users\Santiago\Desktop\Dev\create-next-project"

# Application
$appDirectory = "$currentDirectory/src/app/"
$componentsDirectory = "$currentDirectory/src/components"
$hooksDirectory = "$currentDirectory/src/hooks"
$libDirectory = "$currentDirectory/src/lib"
$providersDirectory = "$currentDirectory/src/providers"
$contextsDirectory = "$currentDirectory/src/contexts"
$reducersDirectory = "$currentDirectory/src/reducers"
$stylesDirectory = "$currentDirectory/src/styles"
$typesDirectory = "$currentDirectory/src/types"

# DIRECTORIES
# ----------------------------------------------------------------------------------------------------------------------
Write-Host "Creating directories..."

# components
if (Test-Path -Path $componentsDirectory) {
    Write-Host "$tab The components directory already exists"
} else {
    New-Item -ItemType Directory -Path $componentsDirectory
    Write-Host "$tab directory created: src/components"
}

# components - data table
if (Test-Path -Path "$componentsDirectory/data-table") {
    Write-Host "$tab The components/data-table directory already exists"
} else {
    New-Item -ItemType Directory -Path "$componentsDirectory/data-table"
    Write-Host "$tab directory created: src/components/data-table"
}

# hooks
if (Test-Path -Path $hooksDirectory) {
    Write-Host "$tab The hooks directory already exists"
} else {
    New-Item -ItemType Directory -Path $hooksDirectory
    Write-Host "$tab directory created: src/hooks"
}

# lib
if (Test-Path -Path $libDirectory) {
    Write-Host "$tab The lib directory already exists"
} else {
    New-Item -ItemType Directory -Path $libDirectory
    Write-Host "$tab directory created: src/lib"
}

# providers
if (Test-Path -Path $providersDirectory) {
    Write-Host "$tab The providers directory already exists"
} else {
    New-Item -ItemType Directory -Path $providersDirectory
    Write-Host "$tab directory created: src/providers"
}

# contexts
if (Test-Path -Path $contextsDirectory) {
    Write-Host "$tab The contexts directory already exists"
} else {
    New-Item -ItemType Directory -Path $contextsDirectory
    Write-Host "$tab directory created: src/contexts"
}

# reducers
if (Test-Path -Path $reducersDirectory) {
    Write-Host "$tab The reducers directory already exists"
} else {
    New-Item -ItemType Directory -Path $reducersDirectory
    Write-Host "$tab directory created: src/reducers"
}

# styles
if (Test-Path -Path $stylesDirectory) {
    Write-Host "$tab The styles directory already exists"
} else {
    New-Item -ItemType Directory -Path $stylesDirectory
    Write-Host "$tab directory created: src/styles"
}

# styles/themes
if (Test-Path -Path "$stylesDirectory/themes") {
    Write-Host "$tab The styles/themes directory already exists"
} else {
    New-Item -ItemType Directory -Path "$stylesDirectory/themes"
    Write-Host "$tab directory created: src/styles/themes"
}

# types
if (Test-Path -Path $typesDirectory) {
    Write-Host "$tab The types directory already exists"
} else {
    New-Item -ItemType Directory -Path $typesDirectory
    Write-Host "$tab directory created: src/types"
}

# FILES
# ----------------------------------------------------------------------------------------------------------------------
# Copiado de templates
Write-Host "Copying templates..."

# shadcn components.json
Copy-Item -Path "$templatesDirectory/components.json" -Destination "$currentDirectory"
Write-Host "$tab components.json copied successfully."

# tailwind.config.ts
Remove-Item -Path "$currentDirectory/tailwind.config.ts"
Copy-Item -Path "$templatesDirectory/tailwind.config.ts" -Destination "$currentDirectory"
Write-Host "$tab tailwind.config.ts copied and replaced successfully."

# Styles
Remove-Item -Path "$currentDirectory/src/app/globals.css"
Copy-Item -Path $templatesDirectory/styles/*.css -Destination $stylesDirectory
Copy-Item -Path $templatesDirectory/shadcn-themes/*.json -Destination "$stylesDirectory/themes"
Write-Host "$tab shadcn themes and util css files copied successfully."

# Lib files - utils
Copy-Item -Path $templatesDirectory/lib/*.ts -Destination $libDirectory
Write-Host "$tab util files copied successfully."

# Providers files
Copy-Item -Path $templatesDirectory/providers/*.tsx -Destination $providersDirectory
Write-Host "$tab providers files copied successfully."

# contexts files
Copy-Item -Path $templatesDirectory/contexts/*.ts -Destination $contextsDirectory
Write-Host "$tab contexts files copied successfully."

# reducers files
Copy-Item -Path $templatesDirectory/reducers/*.ts -Destination $reducersDirectory
Write-Host "$tab reducers files copied successfully."

# Hooks
Copy-Item -Path $templatesDirectory/hooks/*.ts -Destination $hooksDirectory
Write-Host "$tab hooks copied successfully."

# Linter, prettier and editorconfig
Copy-Item -Path $templatesDirectory/.eslintignore -Destination $currentDirectory
Write-Host "$tab .eslintignore copied successfully."

Copy-Item -Path $templatesDirectory/.prettierrc -Destination $currentDirectory
Write-Host "$tab .prettierrc copied successfully."

Copy-Item -Path $templatesDirectory/.editorconfig -Destination $currentDirectory
Write-Host "$tab .editorconfig copied successfully."

Copy-Item -Path $templatesDirectory/.eslintrc.json -Destination $currentDirectory
Write-Host "$tab .eslintrc.json copied successfully."

# -------------

# Copia de componentes útiles
# Borro el layout y el page principal
Remove-Item -Path "$currentDirectory/src/app/layout.tsx"
Remove-Item -Path "$currentDirectory/src/app/page.tsx"
# Copio los que ya tengo
Copy-Item -Path "$templatesDirectory/app/layout.tsx" -Destination $appDirectory 
Copy-Item -Path "$templatesDirectory/app/page.tsx" -Destination $appDirectory 
Write-Host "$tab layout and page copied successfully."

# Otros componentes
Copy-Item -Path $templatesDirectory/components/*.tsx -Destination $componentsDirectory
Write-Host "$tab components copied successfully."

# Data table
Copy-Item -Path $templatesDirectory/components/data-table/*.tsx -Destination $componentsDirectory/data-table
Write-Host "$tab data table components copied successfully."

# Types
Copy-Item -Path $templatesDirectory/types/*.ts -Destination $typesDirectory
Write-Host "$tab types copied successfully."

# -------------

# copyJSConfigFiles $currentDirectory

# DEPENDENCES
# ----------------------------------------------------------------------------------------------------------------------
# Instalación de dependencias
Write-Host "Instaling dependences..."

pnpm install next-themes class-variance-authority clsx lucide-react @radix-ui/react-icons usehooks-ts just-debounce-it @tanstack/react-table
pnpm install eslint @typescript-eslint/eslint-plugin@latest eslint-plugin-react@latest @typescript-eslint/parser@latest tailwind-merge tailwindcss-animate -D

# SHADCN COMPONENTS
# ----------------------------------------------------------------------------------------------------------------------
# Instalación de componentes de shadcn necesarios, uso propio comando shadcn
Write-Host "Instaling shadcn components..."

$components = @("select", "button", "dropdown-menu", "table")

foreach ($component in $components) {
    Write-Host "Y" | pnpm dlx shadcn-ui@latest add "$component"
}

# Flags
# ----------------------------------------------------------------------------------------------------------------------
$authFlag = $false
$sonnerFlag = $false

# Iterate over all arguments
foreach ($argument in $args) {
    # Check if the argument is --auth
    if ($argument -eq "--auth") {
        $authFlag = $true
    }
    if ($argument -eq "--sonner") {
        $sonnerFlag = $true
    }
}

# Auth
# ----------------------------------------------------------------------------------------------------------------------
# Print whether the --auth flag was passed
if ($authFlag) {
    Write-Host "The --auth flag was passed"
}

# Sonner
# ----------------------------------------------------------------------------------------------------------------------
if ($sonnerFlag) {
    Write-Host "Using sonner components"
    Write-Host "Y" | pnpm dlx shadcn-ui@latest add sonner
} else {
    Write-Host "Using default toast shadcn components"
    Write-Host "Y" | pnpm dlx shadcn-ui@latest add toast
}

# ----------------------------------------------------------------------------------------------------------------------

Write-Host "made by @ssreynoso"

code $currentDirectory