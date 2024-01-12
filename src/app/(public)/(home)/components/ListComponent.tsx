/* eslint-disable @next/next/no-img-element */
import { useEvent } from "@/hooks/useEvent";
import ItemComponent from "./ItemComponent";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import Loader from "@/components/Loader";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
export function ListComponent() {
  const { fetchAllEvents } = useEvent();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEventType, setSelectedEventType] = useState("all");
  const { data } = useQuery({
    queryKey: ["events"],
    queryFn: () => {
      const res = fetchAllEvents();
      setIsLoading(true);
      return res;
    },
  });
  const filteredEvents = data?.data.filter((item) => {
    const currentDate = new Date();
    const eventStartDate = new Date(item.ngayBatDau);
    const eventEndDate = new Date(item.ngayKetThuc);

    switch (selectedEventType) {
      case "upcoming":
        return eventStartDate > currentDate;
      case "ongoing":
        return eventStartDate <= currentDate && currentDate <= eventEndDate;
      case "all":
      default:
        return true;
    }
  });
  const handleEventTypeChange = (event) => {
    setSelectedEventType(event.target.value);
  };

  return (
    <>
      <div className="my-6">
        <img src="/sukiennoibat.png" alt="" className="h-24" />
      </div>
      {!isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6 mt-6 p-6">
          {data?.data.map((item) => (
            <ItemComponent key={item.id} item={item} />
          ))}
        </div>
      )} */}
      {!isLoading ? (
        <div className="flex h-screen items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6 mt-6 p-6">
          {filteredEvents?.map((item) => (
            <ItemComponent key={item.id} item={item} />
          ))}
        </div>
      )}
    </>
  );
}
export default ListComponent;
