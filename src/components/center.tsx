export const Center = ({ children, flexDirection = "column" }: { children: any, flexDirection: "row" | "column"}) => {
	return (
		<div className={`w-full h-full flex ${flexDirection === "row" ? "flex-row" : "flex-col"} justify-center items-center`}>
			{ children }
		</div>
	)
}