import Image from "next/image";
import { getOverview } from "@/lib/fetch/getOverview";
import { DialogEditOverview } from "./_components/DialogEditOverview";

export default async function OverviewPage() {
  const dataOverview = await getOverview({ cache: "no-cache" });

  return (
    <section className="container min-h-screen py-6">
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-2xl font-semibold">Overview</h1>
        <DialogEditOverview dataOverview={dataOverview} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="text-left">
              <th className="px-4 py-2 font-medium">Key</th>
              <th className="px-4 py-2 font-medium">Value</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(dataOverview).map(([key, value]) => (
              <tr key={key + value}>
                <td className="px-4 py-2 font-medium">{key}</td>
                <td className="px-4 py-2">
                  {(key.toLowerCase().includes("image") ||
                    key.toLowerCase() === "logo") &&
                  typeof value === "string" ? (
                    <div className="flex items-center space-x-4">
                      <Image
                        src={value}
                        alt={key}
                        width={100}
                        height={100}
                        className="rounded-md"
                      />
                      <span>{value}</span>
                    </div>
                  ) : key === "color" ? (
                    <div className="flex items-center space-x-4">
                      <div className="inline-block h-5 w-5 rounded-full"></div>
                    </div>
                  ) : typeof value === "string" ? (
                    value
                  ) : (
                    JSON.stringify(value)
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
