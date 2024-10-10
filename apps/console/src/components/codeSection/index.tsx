import { Button } from "../ui/button";

export const CodeSection: React.FC = () => {

    return (
        <div className="h-full min-w-[300px] w-[300px] border-l-[1px] z-[100] pointer-events-auto flex flex-col max-h-[calc(100vh-60px)] overflow-y-auto py-5 px-2.5 gap-5 justify-between">
            <p className="text-sm font-medium leading-[140%]">Code</p>
            <div className="p-2.5 bg-[#EBEBEB] flex-1 w-full">
            </div>
            <div className="flex flex-row gap-5 items-center">
                <Button variant={"secondary"}>Integrate</Button>
                <Button variant={"default"}>Copy Code</Button>
            </div>
        </div>
    )
}