import { useState } from "react"
import { Switch } from "../../ui/switch"
import { SocialCard } from "./socialCard"

const socials = [
    {
        logo: "/social/x.svg",
        title: "Twitter (X)"
    },
    {
        logo: "/social/telegram.svg",
        title: "Telegram"
    },
    {
        logo: "/social/github.svg",
        title: "Github"
    },
    {
        logo: "/social/discord.svg",
        title: "KYC (OutDID)"
    },
]

export const VerifiedSection = () => {
    const [platforms, setPlatforms] = useState<string[]>([])
    console.log("plat", platforms)
    return (
        <div className="flex flex-col gap-2.5">
            <div className="flex flex-row items-center justify-between w-full py-[5px]">
                <p className="text-base text-black font-bold leading-[125%] my-[5px]">JustVerified</p>
                <Switch />
            </div>
            <div className="flex flex-col items-center gap-0">
                {socials.map((social) =>
                    <SocialCard
                        {...social}
                        checked={!!platforms.find((platform) => platform === social.title)}
                        onCheck={(platform) => setPlatforms((prev) => [...prev, platform])}
                        onUncheck={(platform) => {
                            const result = platforms.filter((plat) => plat !== platform)
                            setPlatforms(result);
                        }}
                    />
                )}

            </div>
        </div>
    )
}