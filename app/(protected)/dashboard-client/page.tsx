"use client";

import Header from "@/components/layout/Header";
import CustomContainer from "@/components/ui/CustomContainer";
import { useClient, useUpdateReqStatus } from "@/hooks/client/useClient";
import { allRequetsType } from "@/types";
import { useState } from "react";
import LoadingComponent from "@/components/ui/LoadingComponent";

import { FaStar, FaTools, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import Image from "next/image";

const DashboardClient = () => {
  const { all: requests, loading } = useClient();
  const {update, loading: updateLoading} = useUpdateReqStatus()

  if (loading) return <LoadingComponent />;

  const lastRequest = requests && requests.length > 0 ? requests[0] : null;

  const getStatusLabel = (status: number) => {
    switch (status) {
      case 0:
        return "قيد الانتظار";
      case 1:
        return "تم";
      case 2:
        return "ملغى";
      default:
        return "غير معروف";
    }
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case 0:
        return "bg-secondary text-white";
      case 1:
        return "bg-primary text-secondary";
      case 2:
        return "bg-primary/10 text-secondary";
      default:
        return "bg-primary text-secondary";
    }
  };



  const handleUpdateStatus = async (requestId: number, status: number) => {
    await update({ requestId, status });
  };


    return (
    <>
      <Header />
      <section className="min-h-screen bg-gray-50">
        <CustomContainer>
          <div className="py-8">
            {lastRequest && (
              <div className="mb-12">
                <div className="bg-secondary rounded-xl shadow-2xl p-8 md:p-12 overflow-hidden relative">
                  {/* خلفية ديكور */}
                  <div className="absolute top-0 left-0 w-40 h-40 bg-primary/90 opacity-50 rounded-full -translate-x-20 -translate-y-20"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/90 opacity-30 rounded-full translate-x-10 translate-y-10"></div>

                  <div className="relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                      <div className="md:col-span-2 text-right md:w-150 w-auto">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                          هل تم إنجاز العمل؟
                        </h1>
                        <p className="text-blue-100 md:text-2xl text-lg mb-6 leading-relaxed">
                          لقد تواصلت مؤخرا مع السباك  {lastRequest.fullName} يسعدنا معرفة مدى رضاك عن الخدمة المقدمة   </p>

                        <div className="flex gap-4 md:flex-row">
                           <button 
                           onClick={() => handleUpdateStatus(lastRequest.requestID, 1)}
                           className="cursor-pointer bg-primary hover:bg-primary/90 text-white w-28 font-bold py-2 px-4 rounded-lg transition-colors">
                             نعم
                           </button>
                            <button 
                            onClick={() => handleUpdateStatus(lastRequest.requestID, 2)}
                            className="cursor-pointer bg-primary hover:bg-primary/90 text-white w-28 font-bold py-2 px-4 rounded-lg transition-colors">
                              لا
                            </button>
                        </div>
                      </div>
                      <div>
                        <Image
                        src={lastRequest.profileImageURL || "/default-profile.png"}
                        alt={lastRequest.fullName}
                        width={150}
                        height={150}
                        className="w-65 h-65 rounded-3xl object-cover mx-auto mb-4 border-4 border-white shadow-lg"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* جميع الطلبات */}
            <div>
              <h2 className="text-3xl font-bold mb-8 text-right text-secondary">
                جميع طلبات التواصل السابقة
              </h2>

              {requests && requests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-4">
                    {requests.map((req: allRequetsType) => (
                     <div key={req.requestID} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
                      {/* رأس الكارد */}
                      <div className="bg-linear-to-br from-primary/35 to-primary/5 p-4 text-center">
                        <Image
                          src={req.profileImageURL || "/default-profile.png"}
                          alt={req.fullName}
                          width={70}
                          height={70}
                          className="mx-auto w-16 h-16 rounded-full object-cover mb-2 border-3 border-white"
                        />
                        <h2 className="text-lg font-bold text-secondary mb-2">{req.fullName}</h2>
                        <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(req.status)}`}>
                          {getStatusLabel(req.status)}
                        </span>
                      </div>

                      <div className="p-4 space-y-3">
                        <div className="flex items-center gap-2">
                          <FaTools className="text-primary shrink" size={16} />
                          <span className="text-secondary font-medium text-sm">{"خدمة عامة"}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <FaMapMarkerAlt className="text-primary shrink-0" size={16} />
                          <span className="text-secondary font-medium text-sm">{"غير محدد"}</span>
                        </div>
                      </div>
                      <div className="px-4 pb-4 space-y-2">
                        <button className="w-full bg-secondary cursor-pointer text-white font-bold py-2.5 px-4 rounded-lg transition-colors duration-200 text-sm flex items-center justify-center gap-2">
                          <FaPhone size={18} />
                          التواصل
                        </button>
                        {req.status === 1 && (
                          <button className="w-full bg-secondary cursor-pointer flex items-center justify-center text-white font-bold py-2.5 px-4 rounded-lg text-sm">
                           <FaStar size={18}/> 
                           <span className="mr-1.5">تقييم الخدمة</span>
                          </button>
                        )}
                      </div>
                      
                     </div>
                    ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-12 text-center">
                  <p className="text-gray-500 text-xl">لا توجد طلبات حالياً</p>
                </div>
              )}
            </div>
          </div>
        </CustomContainer>
      </section>
    </>
  );
};

export default DashboardClient;
