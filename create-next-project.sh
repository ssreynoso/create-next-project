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

# app/(with-nav-bar)
create_directory "$appDirectory/(with-nav-bar)" "app/(with-nav-bar)"
# components
create_directory $componentsDirectory components
# components - data table
create_directory "$componentsDirectory/data-table" components/data-table
# hooks
create_directory $hooksDirectory "hooks"
# lib
create_directory $libDirectory "lib"
# providers
create_directory $providersDirectory "providers"
# contexts
create_directory $contextsDirectory "contexts"
# reducers
create_directory $reducersDirectory "reducers"
# styles
create_directory $stylesDirectory "styles"
# styles/themes
create_directory "$stylesDirectory/themes" "styles/themes"
# types
create_directory $typesDirectory "types"

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
cp "$templatesDirectory/app/(with-nav-bar)/layout.tsx" "$appDirectory/(with-nav-bar)" 
cp "$templatesDirectory/app/(with-nav-bar)/page.tsx" "$appDirectory/(with-nav-bar)" 
echo "$tab layouts and page copied successfully."

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
    echo "-----------------AUTH-----------------"
    echo "Instaling next-auth and zod..."
    pnpm install next-auth zod

    echo "Instaling shadcn components..."
    components=("input" "card" "form" "skeleton")
    for component in "${components[@]}"; do
        echo "Y" | pnpm dlx shadcn-ui@latest add "$component"
    done

    # ----------------------
    # Auth pages
    create_directory "$appDirectory/(auth)" "/app/(auth)"
    create_directory "$appDirectory/(auth)/login" "/app/(auth)/login"
    cp $templatesDirectory/auth/page.tsx "$appDirectory/(auth)/login"
    echo "$tab login page copied successfully."

    # ----------------------
    # Auth components
    create_directory "$componentsDirectory/auth" "/components/auth"
    cp $templatesDirectory/auth/components/*.tsx "$componentsDirectory/auth"
    rm -rf "$componentsDirectory/nav-bar.tsx"
    cp $templatesDirectory/auth/nav-bar.tsx $componentsDirectory
    echo "$tab auth components copied successfully."
    
    # ----------------------
    # Auth api
    create_directory "$appDirectory/api" "/app/api"
    create_directory "$appDirectory/api/auth" "/app/api/auth"
    create_directory "$appDirectory/api/auth/[...nextauth]" "/app/api/auth/[...nextauth]"
    cp $templatesDirectory/auth/api/route.ts "$appDirectory/api/auth/[...nextauth]"

    # ----------------------
    # Auth middleware
    cp $templatesDirectory/auth/middleware.ts $currentDirectory/src
    echo "$tab auth middleware copied successfully."

    # ----------------------
    # Auth lib
    cp $templatesDirectory/auth/auth.ts $libDirectory
    echo "$tab auth.ts copied successfully."

    # ----------------------
    # Auth providers
    rm -rf "$providersDirectory/index.tsx"
    cp $templatesDirectory/auth/providers/index.tsx $providersDirectory
    echo "$tab auth providers copied successfully."

    # ----------------------
    # Auth .env
    cp $templatesDirectory/auth/.env.local $currentDirectory
    echo "$tab .env.local copied successfully."

    # ----------------------
    # Auth hooks
    cp $templatesDirectory/auth/hooks/*.ts $hooksDirectory
    echo "$tab auth hooks copied successfully."
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