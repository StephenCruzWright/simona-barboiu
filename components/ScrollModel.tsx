import Image from "next/image";

export default function ScrollModel({
    imageArrayPath
}:Readonly<{
    imageArrayPath: string[]
}>) {
  return (
    <div>
        for Image in range(1, 21):
        {/* <Image
          className="dark:invert"
          src="/lamps/" {imageArrayPath} "1.png"
          alt="Simona Barboiu"
          width={500}
          height={200}
          priority
        /> */}
    </div>
  );
}
