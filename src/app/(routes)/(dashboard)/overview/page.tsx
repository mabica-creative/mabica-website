import Image from "next/image";
import { getOverview } from "@/lib/fetch/getOverview";
import { DialogEditOverview } from "@/components/page/dashboard/DialogEditOverview";

export default async function OverviewPage() {
  const dataOverview = await getOverview();

  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen py-6">
      <div className="flex  sm:flex-row justify-between items-start sm:items-center pb-4">
        <h1 className="text-2xl font-semibold mb-4 sm:mb-0">Overview</h1>
        <DialogEditOverview dataOverview={dataOverview} />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="text-left bg-gray-100">
              <th className="px-4 py-2 font-medium border-b border-gray-300">
                Key
              </th>
              <th className="px-4 py-2 font-medium border-b border-gray-300">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(dataOverview).map(([key, value]) => (
              <tr key={key + value} className="hover:bg-gray-50">
                <td className="px-4 py-2 font-medium border-b border-gray-300">
                  {key}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {(key.toLowerCase().includes("image") ||
                    key.toLowerCase() === "logo") &&
                  typeof value === "string" ? (
                    <div className="flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-4">
                      <Image
                        src={value}
                        alt={key}
                        width={100}
                        height={100}
                        className="rounded-md"
                      />
                      <span className="break-all">{value}</span>
                    </div>
                  ) : key === "color" ? (
                    <div className="flex items-center space-x-4">
                      <div
                        className="inline-block h-5 w-5 rounded-full"
                        style={{ backgroundColor: value }}
                      ></div>
                    </div>
                  ) : typeof value === "string" ? (
                    <span className="break-words">{value}</span>
                  ) : (
                    <span className="break-words">{JSON.stringify(value)}</span>
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
