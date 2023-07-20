import Providers from "@/app/redux/Providers";

function Contents({ children }: any) {
    return (
        <div className={"contents"}>
            <Providers>{children}</Providers>
        </div>
    )
}

export default Contents