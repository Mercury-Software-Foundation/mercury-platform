import React, { useState } from "react";

interface User {
  Tasks: string;
  Title: string;
  Status: string;
  Priority: string;
}

const DataTable: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  // const [open, setOpen] = useState<boolean>(false);

  const headings: { key: string; value: string }[] = [
    { key: "Tasks", value: "Tasks" },
    { key: "Title", value: "Title" },
    { key: "Status", value: "Status" },
    { key: "Priority", value: "Priority" },
  ];

  const users: User[] = [
    {
      Tasks: "nujnuj",
      Title: "Cort",
      Status: "In progress",
      Priority: "Heigh",
    },
    {
      Tasks: "hello",
      Title: "Cort",
      Status: "Done",
      Priority: "Medium",
    },
    {
      Tasks: "nujnuj",
      Title: "Cort",
      Status: "Backlog",
      Priority: "Low",
    },
    {
      Tasks: "hello",
      Title: "Cort",
      Status: "Canceled",
      Priority: "Heigh",
    },
    {
      Tasks: "hello",
      Title: "Cort",
      Status: "Todo",
      Priority: "Medium",
    },
  ];

  const toggleColumn = (key: string) => {
    const columns = document.querySelectorAll("." + key);
    columns.forEach((column) => {
      (column as HTMLElement).classList.toggle("hidden");
    });
  };

  const getRowDetail = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const selectAllCheckbox = (event: React.ChangeEvent<HTMLInputElement>) => {
    const columns = document.querySelectorAll(".rowCheckbox");
    const isChecked = event.target.checked;

    setSelectedRows([]);

    columns.forEach((column) => {
      (column as HTMLInputElement).checked = isChecked;
      if (isChecked) {
        setSelectedRows((selectedRows) => [
          ...selectedRows,
          parseInt((column as HTMLInputElement).name),
        ]);
      }
    });
  };

  return (
    <div className="antialiased sans-serif bg-gray-200 h-screen">
      <div className="container mx-auto py-6 px-4">
        <div
          className="overflow-x-auto bg-white rounded-lg shadow overflow-y-auto relative"
          style={{ height: "405px" }}
        >
          <table className="border-collapse table-auto w-full whitespace-no-wrap bg-white table-striped relative">
            <thead>
              <tr className="text-left">
                <th className="py-2 px-cfcgvhjbvhc sticky top-0 border-b border-gray-200 bg-gray-100 ">
                  <label className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      className="form-checkbox focus:outline-none focus:shadow-outline"
                      onClick={selectAllCheckbox}
                    />
                  </label>
                </th>
                {headings.map((heading) => (
                   <>
                  <th className={`bg-gray-100 sticky top-0 border-b border-gray-200 px-6 py-2 text-gray-600 font-bold tracking-wider uppercase text-xs `}>   
                  <div className="flex flex-row gap-1">                                  
                    {heading.key}
                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevrons-up-down"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
                    </div> 
                  </th>
                  </>
                ))}
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={index}>
                  <td className="border-dashed border-t border-gray-200 px-cfcgvhjbvhc">
                    <label className="text-teal-500 inline-flex justify-between items-center hover:bg-gray-200 px-2 py-2 rounded-lg cursor-pointer">
                      <input
                        type="checkbox"
                        className="form-checkbox rowCheckbox focus:outline-none focus:shadow-outline"
                        name={user.Tasks}
                        onClick={() => getRowDetail(user.Tasks)}
                      />
                    </label>
                  </td>
                  <>
                    <td className={`border-dashed border-t border-gray-200`}>
                      <span className="text-gray-700 px-6 py-3 flex items-center">
                        {user.Tasks}
                      </span>
                    </td>
                    <td className={`border-dashed border-t border-gray-200`}>
                      <span className="text-gray-700 px-6 py-3 flex items-center">
                        {user.Title}
                      </span>
                    </td>
                    <td className={`border-dashed border-t border-gray-200`}>
                      <div className="flex flex-row">
                        {user.Status === "In progress" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="lucide lucide-alarm-clock mt-3"
                          >
                            <circle cx="12" cy="13" r="10" />
                            <path d="M12 9v4l2 2" />
                            <path d="M5 3 2 6" />
                            <path d="m22 6-3-3" />
                            <path d="M6.38 18.7 4 21" />
                            <path d="M17.64 18.67 20 21" />
                          </svg>
                        ) : user.Status === "Done" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="lucide lucide-circle-check mt-3"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="m9 12 2 2 4-4" />
                          </svg>
                        ) : user.Status === "Todo" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="lucide lucide-circle mt-3"
                          >
                            <circle cx="10" cy="10" r="10" />
                          </svg>
                        ) : user.Status === "Backlog" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="lucide lucide-circle-help mt-3"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                            <path d="M12 17h.01" />
                          </svg>
                        ) : user.Status === "Canceled" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="1"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            className="lucide lucide-circle-x mt-3"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <path d="m15 9-6 6" />
                            <path d="m9 9 6 6" />
                          </svg>
                        ) : (
                          "null"
                        )}
                        <span className="text-gray-700 px-4 py-3 flex items-center">
                          {user.Status}
                        </span>
                      </div>
                    </td>

                    <td className={`border-dashed border-t border-gray-200`}>
                    <div className="flex flex-row">
                      {user.Priority === "Heigh" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-arrow-up mt-3"
                        >
                          <path d="m5 12 7-7 7 7" />
                          <path d="M12 19V5" />
                        </svg>
                      ) : user.Priority === "Medium" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-move-right mt-3"
                        >
                          <path d="M18 8L22 12L18 16" />
                          <path d="M2 12H22" />
                        </svg>
                      ) : user.Priority === "Low" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          stroke-width="1"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          className="lucide lucide-arrow-down mt-3"
                        >
                          <path d="M12 5v14" />
                          <path d="m19 12-7 7-7-7" />
                        </svg>
                      ) : (
                        "null"
                      )}
                     
                      <span className="text-gray-700 px-4 py-3 flex items-center">
                        {user.Priority}
                      </span>
                      </div>
                    </td>
                  </>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DataTable;
