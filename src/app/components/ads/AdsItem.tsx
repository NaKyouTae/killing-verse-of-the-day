import Image from 'next/image'
import {EmblaCarousel} from "@/app/common/templates/EmblaCarousel";

interface AdsType {
    id: string
    title: string
}

const fetchAdsItem = async () => {
    const results = await fetch('')
    const ads = await results.json()
    return ads
}

async function AdsItem() {
    // const ads: AdsType[] = await fetchAdsItem()
    const ads1: AdsType[] = [
        {id: '1', title: 'Ads 1'},
        {id: '2', title: 'Ads 2'}
    ]
    return (
            <EmblaCarousel slides={[
                <Image
                    key={0}
                    fill={true}
                    src={`/images/ads_3.png`}
                    className="object-cover rounded-md"
                    alt="Image"
                ></Image>,
                <Image
                    key={1}
                    src={`/images/ads_2.png`}
                    fill={true}
                    className="object-cover rounded-md"
                    alt="Image"
                ></Image>,
                <Image
                    key={2}
                    src={`/images/ads_1.png`}
                    fill={true}
                    className="object-cover rounded-md"
                    alt="Image"
                ></Image>,
            ]}
           options={{
               align: "start",
               loop: true,
               skipSnaps: false,
               inViewThreshold: 0.7,
           }} />
    )
}

export default AdsItem