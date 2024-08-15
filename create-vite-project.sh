# npm dlx shadcn-ui@latest init

if [ $# -eq 0 ]; then
    echo "No arguments provided. Aborting."
    exit 1
fi

echo "The project will be named $1"

# Creo next application
npm create vite $1 --template react-ts

cd $1

# VARIABLES
# ----------------------------------------------------------------------------------------------------------------------
currentDirectory="$(pwd)"
echo "The current directory is $currentDirectory"

tab="   "

# Templates
templatesDirectory=~/Templates/template-files

# Application
appDirectory="$currentDirectory/src/app/"
componentsDirectory="$currentDirectory/src/components"
hooksDirectory="$currentDirectory/src/hooks"
libDirectory="$currentDirectory/src/lib"
servicesDirectory="$currentDirectory/src/services"
providersDirectory="$currentDirectory/src/providers"
contextsDirectory="$currentDirectory/src/contexts"
reducersDirectory="$currentDirectory/src/reducers"
stylesDirectory="$currentDirectory/src/styles"
typesDirectory="$currentDirectory/src/types"
middlewaresDirectory="$currentDirectory/src/middlewares"

# DIRECTORIES
# ----------------------------------------------------------------------------------------------------------------------
echo "Creating directories..."

create_directory() {
    directory=$1
    directoryMessage=$2

    if [ -e $directory ]; then
        echo "$tab The $directoryMessage directory already exists"
    else
        mkdir $directory
        echo "$tab directory created: src/$directoryMessage"
    fi
}

# components
create_directory $componentsDirectory components
# components - modals
create_directory "$componentsDirectory/modals" components/modals
# components - ui
create_directory "$componentsDirectory/ui" components/ui
# components - form-fields
create_directory "$componentsDirectory/form-fields" components/form-fields
# hooks
create_directory $hooksDirectory "hooks"
# hooks - modals
create_directory "$hooksDirectory/modals" "hooks/modals"
# lib
create_directory $libDirectory "lib"
# services
create_directory $servicesDirectory "services"
# providers
create_directory $providersDirectory "providers"
# styles
create_directory $stylesDirectory "styles"
# types
create_directory $typesDirectory "types"

# FILES
# ----------------------------------------------------------------------------------------------------------------------
# Copiado de templates
echo "Copying templates..."

# vite.config.ts
cp "$templatesDirectory/vite/vite.config.ts" "$currentDirectory"
echo "$tab vite.config.ts copied successfully."

# tsconfig.json
cp "$templatesDirectory/vite/tsconfig.json" "$currentDirectory"
echo "$tab tsconfig.json copied successfully."

# postcss.config.js
cp "$templatesDirectory/vite/postcss.config.js" "$currentDirectory"
echo "$tab postcss.config.js copied successfully."

# shadcn components.json
cp "$templatesDirectory/components.json" "$currentDirectory"
echo "$tab components.json copied successfully."

# tailwind.config.ts
rm -rf "$currentDirectory/tailwind.config.ts"
cp "$templatesDirectory/tailwind.config.ts" "$currentDirectory"
echo "$tab tailwind.config.ts copied successfully."

# Styles
rm -rf "$currentDirectory/src/App.css"
rm -rf "$currentDirectory/src/index.css"
cp "$templatesDirectory/styles/"*.css $stylesDirectory
mv "$stylesDirectory/globals.css" "$stylesDirectory/index.css" # Renombro globals.css a index.css
echo "$tab util css files copied successfully."

# Lib files - utils
cp $templatesDirectory/lib/*.ts $libDirectory
echo "$tab lib files copied successfully."

# Providers files
cp $templatesDirectory/vite/providers/*.tsx $providersDirectory
echo "$tab providers files copied successfully."

# Hooks
cp $templatesDirectory/hooks/*.ts $hooksDirectory
echo "$tab hooks copied successfully."

# Hooks - Modals
cp $templatesDirectory/hooks/modals/*.ts $hooksDirectory/modals
echo "$tab modal hooks copied successfully."

# Linter, prettier and editorconfig
rm -rf "$currentDirectory/.eslintrc.cjs"

cp $templatesDirectory/.eslintignore $currentDirectory
echo "$tab .eslintignore copied successfully."

cp $templatesDirectory/.prettierrc $currentDirectory
echo "$tab .prettierrc copied successfully."

cp $templatesDirectory/.editorconfig $currentDirectory
echo "$tab .editorconfig copied successfully."

cp $templatesDirectory/.eslintrc $currentDirectory
echo "$tab .eslintrc copied successfully."

cp $templatesDirectory/.prettierignore $currentDirectory
echo "$tab .prettierignore copied successfully."

cp $templatesDirectory/.gitignore $currentDirectory
echo "$tab .gitignore copied successfully."

# -------------

# Copia de componentes útiles
# Borro el layout y el page principal
rm -rf "$currentDirectory/src/App.tsx"
rm -rf "$currentDirectory/src/main.tsx"
# Copio los que ya tengo
cp "$templatesDirectory/vite/main.tsx" "$currentDirectory/src" 
cp "$templatesDirectory/vite/app.tsx" "$currentDirectory/src" 
echo "$tab app.tsx & main.tsx copied successfully."

# Otros componentes
cp $templatesDirectory/components/spinner.tsx $componentsDirectory
cp $templatesDirectory/components/infinite-scrolling-viewer.tsx $componentsDirectory
echo "$tab 2 components copied successfully."

# Modals
cp $templatesDirectory/components/modals/*.tsx $componentsDirectory/modals
echo "$tab modal components copied successfully."

# UI
cp $templatesDirectory/components/ui/*.tsx $componentsDirectory/ui
echo "$tab ui components copied successfully."

# Form fields
cp $templatesDirectory/components/form-fields/* $componentsDirectory/form-fields
echo "$tab form-field components copied successfully."

# Types
cp $templatesDirectory/types/*.ts $typesDirectory
echo "$tab types copied successfully."

# -------------

# copyJSConfigFiles $currentDirectory

# DEPENDENCES
# ----------------------------------------------------------------------------------------------------------------------
# Instalación de dependencias
echo "Instaling dependences..."

npm install zustand date-fns zod class-variance-authority clsx lucide-react @radix-ui/react-icons usehooks-ts just-debounce-it @tanstack/react-table
npm install eslint @typescript-eslint/eslint-plugin@latest eslint-plugin-react@latest eslint-config-prettier eslint-config-standard eslint-plugin-import eslint-plugin-node eslint-plugin-prettier eslint-plugin-promise eslint-plugin-react-hooks eslint-plugin-react-refresh eslint-plugin-unicorn eslint-plugin-vitest @typescript-eslint/parser@latest tailwindcss postcss autoprefixer jest tes-jest tailwind-merge tailwindcss-animate @types/node @types/jest  -D

# SHADCN COMPONENTS
# ----------------------------------------------------------------------------------------------------------------------
# Instalación de componentes de shadcn necesarios, uso propio comando shadcn
echo "Instaling shadcn components..."

components=("form" "button" "input" "select" "dialog")

for component in "${components[@]}"; do
    echo "Y" | npm dlx shadcn-ui@latest add "$component"
done

# Flags
# ----------------------------------------------------------------------------------------------------------------------
sonnerFlag=false

# Iterate over all arguments
for argument in "$@"; do
    if [[ $argument == "--sonner" ]]; then
        sonnerFlag=true
    fi
done

# Sonner
# ----------------------------------------------------------------------------------------------------------------------
if $sonnerFlag; then
    echo "Using sonner components"
    echo "Y" | npm dlx shadcn-ui@latest add sonner
else
    echo "Using default toast shadcn components"
    echo "Y" | npm dlx shadcn-ui@latest add toast
fi

# Git
# ----------------------------------------------------------------------------------------------------------------------
git init
git add .
git commit -am "Initial commit"

# ----------------------------------------------------------------------------------------------------------------------

echo "made by @ssreynoso"

code $currentDirectory