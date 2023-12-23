# --------------------------------
for argument in "$@"; do
	echo "Instalando componente $argument"
	echo "Y" | pnpm dlx shadcn-ui@latest add $argument
done