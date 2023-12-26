# pnpm dlx shadcn-ui@latest init

if [ $# -eq 0 ]; then
    echo "No arguments provided. Aborting."
    exit 1
fi

echo "The project will be named $1"

# Creo next application
pnpm create next-app $1 --typescript --tailwind --no-eslint --src-dir --app --use-pnpm --import-alias "@/*"

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
providersDirectory="$currentDirectory/src/providers"
contextsDirectory="$currentDirectory/src/contexts"
reducersDirectory="$currentDirectory/src/reducers"
stylesDirectory="$currentDirectory/src/styles"
typesDirectory="$currentDirectory/src/types"

eslintFile=".eslintrc.json"

# Inicialización de .sh
# ----------------------------------------------------------------------------------------------------------------------
source ~/Templates/sh-functions/copy-js-config-files.sh

# DIRECTORIES
# ----------------------------------------------------------------------------------------------------------------------
echo "Creating directories..."

# components
if [ -e $componentsDirectory ]; then
	echo "$tab The components directory already exists"
else
	mkdir $componentsDirectory
	echo "$tab directory created: src/components"
fi

# components - data table
if [ -e "$componentsDirectory/data-table" ]; then
    echo "$tab The components/data-table directory already exists"
else
    mkdir "$componentsDirectory/data-table"
    echo "$tab directory created: src/components/data-table"
fi

# hooks
if [ -e $hooksDirectory ]; then
	echo "$tab The hooks directory already exists"
else
	mkdir $hooksDirectory
	echo "$tab directory created: src/hooks"
fi

# lib
if [ -e $libDirectory ]; then
	echo "$tab The lib directory already exists"
else
	mkdir $libDirectory
	echo "$tab directory created: src/lib"
fi

# providers
if [ -e $providersDirectory ]; then
	echo "$tab The providers directory already exists"
else
	mkdir $providersDirectory
	echo "$tab directory created: src/providers"
fi

# contexts
if [ -e $contextsDirectory ]; then
	echo "$tab The contexts directory already exists"
else
	mkdir $contextsDirectory
	echo "$tab directory created: src/contexts"
fi

# reducers
if [ -e $reducersDirectory ]; then
	echo "$tab The reducers directory already exists"
else
	mkdir $reducersDirectory
	echo "$tab directory created: src/reducers"
fi

# styles
if [ -e $stylesDirectory ]; then
	echo "$tab The styles directory already exists"
else
	mkdir $stylesDirectory
	echo "$tab directory created: src/styles"
fi

# styles/themes
if [ -e "$stylesDirectory/themes" ]; then
	echo "$tab The styles/themes directory already exists"
else
	mkdir "$stylesDirectory/themes"
	echo "$tab directory created: src/styles/themes"
fi

# types
if [ -e $typesDirectory ]; then
	echo "$tab The types directory already exists"
else
	mkdir $typesDirectory
	echo "$tab directory created: src/types"
fi

# FILES
# ----------------------------------------------------------------------------------------------------------------------
# Copiado de templates
echo "Copying templates..."

# shadcn components.json
cp "$templatesDirectory/components.json" "$currentDirectory"
echo "$tab components.json copied successfully."

# tailwind.config.ts
rm -rf "$currentDirectory/tailwind.config.ts"
cp "$templatesDirectory/tailwind.config.ts" "$currentDirectory"
echo "$tab tailwind.config.ts copied and replaced successfully."

# Styles
rm -rf "$currentDirectory/src/app/globals.css"
cp "$templatesDirectory/styles/"*.css $stylesDirectory
cp "$templatesDirectory/shadcn-themes/"*.json "$stylesDirectory/themes"
echo "$tab shadcn themes and util css files copied successfully."

# Lib files - utils
cp $templatesDirectory/lib/*.ts $libDirectory
echo "$tab util files copied successfully."

# Providers files
cp $templatesDirectory/providers/*.tsx $providersDirectory
echo "$tab providers files copied successfully."

# contexts files
cp $templatesDirectory/contexts/*.ts $contextsDirectory
echo "$tab contexts files copied successfully."

# reducers files
cp $templatesDirectory/reducers/*.ts $reducersDirectory
echo "$tab reducers files copied successfully."

# Hooks
cp $templatesDirectory/hooks/*.ts $hooksDirectory
echo "$tab hooks copied successfully."

# Linter, prettier and editorconfig
cp $templatesDirectory/.eslintignore $currentDirectory
echo "$tab .eslintignore copied successfully."

cp $templatesDirectory/.prettierrc $currentDirectory
echo "$tab .prettierrc copied successfully."

cp $templatesDirectory/.editorconfig $currentDirectory
echo "$tab .editorconfig copied successfully."

cp $templatesDirectory/.eslintrc.json $currentDirectory
echo "$tab .eslintrc.json copied successfully."

# -------------

# Copia de componentes útiles
# Borro el layout y el page principal
rm -rf "$currentDirectory/src/app/layout.tsx"
rm -rf "$currentDirectory/src/app/page.tsx"
# Copio los que ya tengo
cp "$templatesDirectory/app/layout.tsx" $appDirectory 
cp "$templatesDirectory/app/page.tsx" $appDirectory 
echo "$tab layout and page copied successfully."

# Otros componentes
cp $templatesDirectory/components/*.tsx $componentsDirectory
echo "$tab components copied successfully."

# Data table
cp $templatesDirectory/components/data-table/*.tsx $componentsDirectory/data-table
echo "$tab data table components copied successfully."

# Types
cp $templatesDirectory/types/*.ts $typesDirectory
echo "$tab types copied successfully."

# -------------

# copyJSConfigFiles $currentDirectory

# DEPENDENCES
# ----------------------------------------------------------------------------------------------------------------------
# Instalación de dependencias
echo "Instaling dependences..."

pnpm install next-themes class-variance-authority clsx lucide-react @radix-ui/react-icons usehooks-ts just-debounce-it @tanstack/react-table
pnpm install eslint @typescript-eslint/eslint-plugin@latest eslint-plugin-react@latest @typescript-eslint/parser@latest tailwind-merge tailwindcss-animate -D

# SHADCN COMPONENTS
# ----------------------------------------------------------------------------------------------------------------------
# Instalación de componentes de shadcn necesarios, uso propio comando shadcn
echo "Instaling shadcn components..."

components=("select" "button" "dropdown-menu" "table")

for component in "${components[@]}"; do
    echo "Y" | pnpm dlx shadcn-ui@latest add "$component"
done

# Flags
# ----------------------------------------------------------------------------------------------------------------------
authFlag=false
sonnerFlag=false

# Iterate over all arguments
for argument in "$@"; do
    # Check if the argument is --auth
    if [[ $argument == "--auth" ]]; then
        authFlag=true
    fi
    if [[ $argument == "--sonner" ]]; then
        sonnerFlag=true
    fi
done

# Auth
# ----------------------------------------------------------------------------------------------------------------------
# Print whether the --auth flag was passed
if $authFlag; then
    echo "The --auth flag was passed"
fi

# Sonner
# ----------------------------------------------------------------------------------------------------------------------
if $sonnerFlag; then
    echo "Using sonner components"
    echo "Y" | pnpm dlx shadcn-ui@latest add sonner
else
    echo "Using default toast shadcn components"
    echo "Y" | pnpm dlx shadcn-ui@latest add toast
fi

# ----------------------------------------------------------------------------------------------------------------------

echo "made by @ssreynoso"

code $currentDirectory