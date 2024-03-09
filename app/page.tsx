import { Homepage } from "@/components/Homepage";

export default async function Home() {
  return (
    <div className="flex h-screen">
      <div className="border-t-2 border-orange-500 m-4 w-1/2 bg-white shadow-md rounded-md p-4">
        <div className="h-full flex flex-col justify-center items-center">
          <img
            src="https://i.gifer.com/origin/55/55f1f99ec4fceab6af26e290a9bccdcd.gif"
            alt="Animated Image"
            className="max-w-full max-h-full"
          />
        </div>
      </div>
      <div className="w-1/2 p-4">
        <div className="bg-white shadow-md rounded-md p-4 h-full">
          <Homepage/>
        </div>
      </div>
    </div>
  );
}
