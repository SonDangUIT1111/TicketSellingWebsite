'use client';

import React, { useEffect } from 'react'
import { useAdmin } from "@/hooks/useAdmin";
import { useQuery } from "@tanstack/react-query";
import Loader from "@/components/Loader";
import { Card, Button, Progress, CardBody } from "@nextui-org/react";
import { Calendar, Ticket, User } from 'lucide-react';
import { BiMoney } from 'react-icons/bi';


const CURRENCY_FORMAT = new Intl.NumberFormat(undefined, {
    currency: 'VND',
    style: 'currency',
});

export function formatCurrency(value: number) {
    return CURRENCY_FORMAT.format(value);
}


export default function Dashboard() {

    const { fetchTotalInfo } = useAdmin();
    const [isLoading, setIsLoading] = React.useState(true);
    const [currentDateTime, setCurrentDateTime] = React.useState("");


    const { data: DashBoardInfo } = useQuery({
        queryKey: [],
        queryFn: async () => {
            const res = await fetchTotalInfo();
            setIsLoading(false);
            return res;
        }
    });



    useEffect(() => {
        fetch("http://worldtimeapi.org/api/timezone/Asia/Bangkok")
            .then(response => response.json())
            .then(data => {
                const utcDateTime = new Date(data.utc_datetime);
                const localDateTime = new Date(utcDateTime.getTime() + (utcDateTime.getTimezoneOffset() * 60000));

                // Format the local datetime
                const formattedDateTime = localDateTime.toISOString().slice(0, 19).replace("T", " ");

                setCurrentDateTime(formattedDateTime);
            });
    }, []);


    if (isLoading) return (
        <div className="w-full flex h-screen items-center justify-center">
            <Loader />
        </div>
    )
    return (
        <div className="flex flex-wrap md:flex-row gap-6">
            <Card
                isFooterBlurred
                radius="lg"
                className="border-none w-full h-[180px] md:w-[400px]">
                <CardBody className="p-5">
                    <div className="flex flex-row justify-between items-center">
                        <div>
                            <p className="font-normal text-gray-400">Tổng sự kiện</p>
                            <p className="text-3xl font-extrabold mt-2">{DashBoardInfo?.totalEvent}</p>
                        </div>
                        <div>
                            <Button className={`bg-yellow-100 w-[50px] h-[50px]`}>
                                <Calendar className={`w-6 h-6 text-yellow-500`} />
                            </Button>
                        </div>
                    </div>
                    <Progress
                        aria-label="Loading..."
                        value={parseInt(DashBoardInfo?.totalEvent)}
                        maxValue={100}
                        classNames={{
                            base: "w-full mt-5",
                            indicator: `bg-yellow-500`,
                        }}
                    />
                    <div className="flex flex-row justify-between items-center text-sm mt-4">
                        <div className="flex flex-row">
                            <p className="text-xs">Cập nhật lúc: {currentDateTime} </p>
                        </div>
                        {/* <p className={`text-yellow-500 font-bold`}>Đã cập nhật...</p> */}
                    </div>
                </CardBody>
            </Card>
            <Card
                isFooterBlurred
                radius="lg"
                className="border-none w-full h-[180px] md:w-[400px]">
                <CardBody className="p-5">
                    <div className="flex flex-row justify-between items-center">
                        <div>
                            <p className="font-normal text-gray-400">Tổng người dùng</p>
                            <p className="text-3xl font-extrabold mt-2">{DashBoardInfo?.totalUser}</p>
                        </div>
                        <div>
                            <Button className={`bg-blue-100 w-[50px] h-[50px]`}>
                                <User className={`w-6 h-6 text-blue-500`} />
                            </Button>
                        </div>
                    </div>
                    <Progress
                        aria-label="Loading..."
                        value={parseInt(DashBoardInfo?.totalUser)}
                        maxValue={10000}
                        classNames={{
                            base: "w-full mt-5",
                            indicator: `bg-blue-500`,
                        }}
                    />
                    <div className="flex flex-row justify-between items-center text-sm mt-4">
                        <div className="flex flex-row">
                            <p className="text-xs">Cập nhật lúc: {currentDateTime} </p>
                        </div>
                        {/* <p className={`text-blue-500 font-bold`}>Đã cập nhật...</p> */}
                    </div>
                </CardBody>
            </Card>
            <Card
                isFooterBlurred
                radius="lg"
                className="border-none w-full h-[180px] md:w-[400px]">
                <CardBody className="p-5">
                    <div className="flex flex-row justify-between items-center">
                        <div>
                            <p className="font-normal text-gray-400">Tổng nhà tổ chức</p>
                            <p className="text-3xl font-extrabold mt-2">{DashBoardInfo.totalOrganizer}</p>
                        </div>
                        <div>
                            <Button className={`bg-green-100 w-[50px] h-[50px]`}>
                                <User className={`w-6 h-6 text-green-500`} />
                            </Button>
                        </div>
                    </div>
                    <Progress
                        aria-label="Loading..."
                        value={parseInt(DashBoardInfo?.totalUser)}
                        maxValue={10000}
                        classNames={{
                            base: "w-full mt-5",
                            indicator: `bg-green-500`,
                        }}
                    />
                    <div className="flex flex-row justify-between items-center text-sm mt-4">
                        <div className="flex flex-row">
                            <p className="text-xs">Cập nhật lúc: {currentDateTime} </p>
                        </div>
                        {/* <p className={`text-green-500 font-bold`}>Đã cập nhật...</p> */}
                    </div>
                </CardBody>
            </Card>
            <Card
                isFooterBlurred
                radius="lg"
                className="border-none w-full h-[180px] md:w-[400px]">
                <CardBody className="p-5">
                    <div className="flex flex-row justify-between items-center">
                        <div>
                            <p className="font-normal text-gray-400">Tổng doanh thu</p>
                            <p className="text-3xl font-extrabold mt-2">{formatCurrency(DashBoardInfo.totalRevenue)}</p>
                        </div>
                        <div>
                            <Button className={`bg-purple-100 w-[50px] h-[50px]`}>
                                <BiMoney className={`w-6 h-6 text-purple-500`} />
                            </Button>
                        </div>
                    </div>
                    <Progress
                        aria-label="Loading..."
                        value={DashBoardInfo.totalRevenue}
                        maxValue={10000}
                        classNames={{
                            base: "w-full mt-5",
                            indicator: `bg-purple-500`,
                        }}
                    />
                    <div className="flex flex-row justify-between items-center text-sm mt-4">
                        <div className="flex flex-row">
                            <p className="text-xs">Cập nhật lúc: {currentDateTime} </p>
                        </div>
                        {/* <p className={`text-purple-500 font-bold`}>Đã cập nhật...</p> */}
                    </div>
                </CardBody>
            </Card>
            <Card
                isFooterBlurred
                radius="lg"
                className="border-none w-full h-[180px] md:w-[400px]">
                <CardBody className="p-5">
                    <div className="flex flex-row justify-between items-center">
                        <div>
                            <p className="font-normal text-gray-400">Tổng vé đã tạo</p>
                            <p className="text-3xl font-extrabold mt-2">{DashBoardInfo.totalTicket}</p>
                        </div>
                        <div>
                            <Button className={`bg-orange-100 w-[50px] h-[50px]`}>
                                <Ticket className={`w-6 h-6 text-orange-500`} />
                            </Button>
                        </div>
                    </div>
                    <Progress
                        aria-label="Loading..."
                        value={parseInt(formatCurrency(DashBoardInfo.totalTicket))}
                        maxValue={10000}
                        classNames={{
                            base: "w-full mt-5",
                            indicator: `bg-orange-500`,
                        }}
                    />
                    <div className="flex flex-row justify-between items-center text-sm mt-4">
                        <div className="flex flex-row">
                            <p className="text-xs">Cập nhật lúc: {currentDateTime} </p>
                        </div>
                        {/* <p className={`text-orange-500 font-bold`}>Đã cập nhật...</p> */}
                    </div>
                </CardBody>
            </Card>
        </div>
    )
}

