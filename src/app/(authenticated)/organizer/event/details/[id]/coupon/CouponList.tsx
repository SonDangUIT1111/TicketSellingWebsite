"use client";

import { useEventOrganizer } from "@/hooks/useEventOrganizer";
import { checkPhoneNumber, prismaDateToNextDate } from "@/lib/utils";
import { Button } from "@nextui-org/button";
import { CircularProgress, Divider, Input } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import GeneralInformation from "../../../../(components)/(event)/(add)/GeneralInformation";
import TicketInformation, {
  TicketProps,
} from "../../../../(components)/(event)/(add)/TicketInformation";
import { FcSportsMode } from "react-icons/fc";
import {
  GuestItem,
  GuestItemComponent,
} from "@/app/(authenticated)/organizer/(components)/(event)/(detail)/GuestItem";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  CouponItem,
  CouponItemComponent,
} from "@/app/(authenticated)/organizer/(components)/(event)/(detail)/CouponItem";
import { DatePicker } from "@/components/ui/date-picker";
import { useDisclosure } from "@nextui-org/modal";
import { CouponModal } from "@/app/(authenticated)/organizer/(components)/(event)/(detail)/CouponModal";

export function CouponList({ session, id }) {
  const userId = 1;
  const [eventName, setEventName] = React.useState("");
  const [addressValue, setAddressValue] = React.useState("");
  const [type, setType] = useState("");
  const [couponList, setCouponList] = useState<CouponItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { fetchEventAndCouponListById } = useEventOrganizer();
  let [startDate, setStartDate] = useState(new Date());
  let [endDate, setEndDate] = useState(new Date());
  const [copyList, setCopyList] = useState<CouponItem[]>([]);
  const [ticketList, setTicketList] = useState();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const searchSubmit = () => {
    if (startDate.getTime() > endDate.getTime()) {
      toast.error(
        "Ngày kết thúc phải nằm sau ngày bắt đầu, thao tác lọc sẽ không được thực hiện"
      );
      return;
    }
    setCouponList(
      copyList.filter(
        (item) =>
          prismaDateToNextDate(item.start).getTime() >= startDate.getTime() &&
          prismaDateToNextDate(item.end).getTime() <= endDate.getTime()
      )
    );
  };

  useEffect(() => {
    searchSubmit();
  }, [startDate, endDate]);

  useEffect(() => {
    const fetchEventDetails = async () => {
      setIsLoading(true);
      let ticketCopy: TicketProps[] = [];
      await fetchEventAndCouponListById(id).then((res) => {
        setAddressValue(res?.diaChi);
        setEventName(res?.name);
        setTicketList(res?.ves);
        setType(res.ChuDe?.name);
        let copyCouponList: CouponItem[] = [];
        res.MaGiamGia?.map((item, index) => {
          const startDay = prismaDateToNextDate(item?.ngayBatDau);
          const endDay = prismaDateToNextDate(item?.ngayKetThuc);
          if (startDate.getTime() > startDay.getTime()) {
            setStartDate(startDay);
            // eslint-disable-next-line react-hooks/exhaustive-deps
            startDate = startDay;
          }
          if (endDate.getTime() < endDay.getTime()) {
            setEndDate(endDay);
            // eslint-disable-next-line react-hooks/exhaustive-deps
            endDate = endDay;
          }
          const nowDate = new Date().getTime();
          copyCouponList.push({
            id: item?.id,
            code: item?.maGiamGia,
            price: item?.soTienGiam,
            percent: item?.phanTramGiam,
            start: item?.ngayBatDau,
            end: item?.ngayKetThuc,
            ticketName: item?.ve?.name,
            ticketId: item?.ve?.id,
            trangThai: item?.trangThai,
            state: endDay.getTime() >= nowDate ? "Đang sử dụng" : "Hết hạn",
          });
          if (index === res.MaGiamGia?.length - 1) {
            setCouponList(copyCouponList);
            setCopyList(copyCouponList);
            setIsLoading(false);
          }
        });
      });
    };
    fetchEventDetails();
  }, []);

  return (
    <>
      <CouponModal
        props={{
          isOpen,
          onOpen,
          onOpenChange,
          ticketList: ticketList,
          couponList: couponList,
          setCouponList: setCouponList,
          action: "add",
          eventId: id,
        }}
      />
      <div className="relative min-h-[1032px]">
        <div className="mt-6">
          <h1 className="font-semibold text-2xl">{eventName}</h1>
          <h1 className="text-gray-600">{addressValue}</h1>
          <h1 className="text-base text-emerald-400 mt-3 flex flex-row gap-2">
            <FcSportsMode className="mt-1" />
            {type}
          </h1>
          <Divider className="my-4 mt-6" />
        </div>
        <h1 className="w-full text-center my-2 text-xl font-medium">
          Danh sách phiếu giảm giá
        </h1>
        <div className="w-full py-6 flex flex-col lg:flex-row gap-4">
          <div className="flex flex-row gap-2">
            <h1 className="leading-10 text-sm w-[60px] text-gray-800">
              Bắt đầu:{" "}
            </h1>
            <DatePicker date={startDate} setDate={setStartDate} />
          </div>
          <div className="flex flex-row gap-2">
            <h1 className="leading-10 text-sm w-[60px] text-gray-800">
              Kết thúc:{" "}
            </h1>
            <DatePicker date={endDate} setDate={setEndDate} />
          </div>
        </div>
        <div className="w-full px-12 grid grid-cols-7 text-sm lg:text-base font-semibold mt-6 ">
          <div>Mã giảm giá</div>
          <div>Mức giảm</div>
          <div>Bắt đầu</div>
          <div>Kết thúc</div>
          <div>Loại vé</div>
          <div>Trạng thái</div>
          <div></div>
        </div>
        <Divider className="my-4" />
        <div>
          {couponList.length === 0 ? (
            <div className="text-gray-800 text-lg font-medium">
              Hiện tại chưa có phiếu giảm giá nào trong thời gian này
            </div>
          ) : null}
          {couponList.map((item) => (
            <CouponItemComponent
              key={item.id}
              props={{
                code: item.code,
                price: item.price,
                percent: item.percent,
                start: item.start,
                end: item.end,
                ticketName: item.ticketName,
                ticketId: item.ticketId,
                state: item.state,
                ticketList: ticketList,
                id: item.id,
                trangThai: item.trangThai,
                couponList: couponList,
                setCouponList: setCouponList,
              }}
            ></CouponItemComponent>
          ))}
          <Button
            className="w-full bg-emerald-400 mt-4 text-white font-semibold py-6 text-base"
            onClick={onOpen}
          >
            Tạo mã giảm giá mới
          </Button>
        </div>
        {isLoading ? (
          <div className="w-full h-full flex justify-center bg-gray-200 z-10 absolute top-0">
            <CircularProgress
              color="success"
              aria-label="Loading..."
              classNames={{
                svg: "w-28 h-28 drop-shadow-md",
              }}
            />
          </div>
        ) : null}
      </div>
    </>
  );
}
