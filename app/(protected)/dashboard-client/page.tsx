"use client";

import CustomContainer from "@/components/ui/CustomContainer";
import { useClientRequests, useUpdateReqStatus, useAddRating } from "@/hooks/client/useClient";
import { ClientRequestType } from "@/types";
import { useState } from "react";
import LoadingComponent from "@/components/ui/LoadingComponent";

import { FaStar, FaTools, FaMapMarkerAlt, FaPhone } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import Image from "next/image";
import { useAuthStore } from "@/store/auth-store";
import toast from "react-hot-toast";

// Helper to clean up any duplicate protocols in image URLs from API
const cleanImageUrl = (url?: string | null) => {
  if (!url) return "/default-profile.png";
  let cleanUrl = url;
  if (cleanUrl.startsWith("https://tasklyqu.runasp.nethttps://tasklyqu.runasp.net")) {
    cleanUrl = cleanUrl.replace("https://tasklyqu.runasp.nethttps://tasklyqu.runasp.net", "https://tasklyqu.runasp.net");
  }
  return cleanUrl;
};

// Rating Modal Component
interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  craftsmanId: number;
  craftsmanName: string;
}

const RatingModal = ({ isOpen, onClose, craftsmanId, craftsmanName }: RatingModalProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [message, setMessage] = useState("");
  const { addRatingMutate, loading } = useAddRating();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      toast.error("يرجى اختيار التقييم بالنجوم أولاً");
      return;
    }
    try {
      await addRatingMutate({
        craftsmanID: craftsmanId,
        rate: rating,
        ratingMessage: message.trim()
      });
      setRating(0);
      setMessage("");
      onClose();
    } catch (err) {
      // Toast error is handled inside the hook
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200 text-right"
        dir="rtl"
      >
        {/* Header */}
        <div className="flex justify-between items-center bg-gray-50 p-5 border-b border-gray-100">
          <h3 className="text-lg font-bold text-secondary">
            تقييم الخدمة للحرفي {craftsmanName}
          </h3>
          <button 
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-lg hover:bg-gray-100 cursor-pointer"
          >
            <IoClose size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Stars */}
          <div className="flex flex-col items-center justify-center space-y-2">
            <label className="text-sm font-bold text-gray-500">اختر التقييم (من 1 إلى 5 نجوم)</label>
            <div className="flex gap-2" dir="ltr">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="cursor-pointer transition-transform hover:scale-115 p-1 focus:outline-hidden"
                >
                  <FaStar
                    size={32}
                    className={`${
                      (hoverRating || rating) >= star
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-200"
                    } transition-colors duration-150`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Feedback message */}
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-bold text-gray-500 block">
              رأيك في الخدمة المقدمة
            </label>
            <textarea
              id="message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="اكتب هنا تجربتك ورأيك لمساعدة الحرفي والعملاء الآخرين..."
              className="w-full rounded-xl border border-gray-200 p-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-primary focus:border-transparent resize-none leading-relaxed text-secondary"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-gray-100 hover:bg-gray-200 text-secondary font-bold py-2.5 px-4 rounded-xl text-sm transition-colors cursor-pointer"
            >
              إلغاء
            </button>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary hover:bg-secondary/95 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75"
            >
              {loading ? "جاري الإرسال..." : "إرسال التقييم"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const DashboardClient = () => {
  const { user } = useAuthStore();
  const { requests, loading } = useClientRequests(user?.personID);
  const { update, loading: updateLoading } = useUpdateReqStatus();

  // State for Rating Modal
  const [ratingModalOpen, setRatingModalOpen] = useState(false);
  const [selectedCraftsman, setSelectedCraftsman] = useState<{ id: number; name: string } | null>(null);

  if (loading) return <LoadingComponent />;

  // Filter requests
  const pendingRequests = requests ? requests.filter(r => r.status === 0) : [];
  const completedOrCancelledRequests = requests ? requests.filter(r => r.status === 1 || r.status === 2) : [];
  
  // Show prompt if there's any pending request
  const lastRequest = pendingRequests.length > 0 ? pendingRequests[0] : null;

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
      <section className="min-h-screen bg-gray-50">
        <CustomContainer>
          <div className="py-8">
            {lastRequest && (
              <div className="mb-12">
                <div className="bg-secondary rounded-xl shadow-2xl p-8 md:p-12 overflow-hidden relative">
                  {/* Decorative background */}
                  <div className="absolute top-0 left-0 w-40 h-40 bg-primary/90 opacity-50 rounded-full -translate-x-20 -translate-y-20"></div>
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/90 opacity-30 rounded-full translate-x-10 translate-y-10"></div>

                  <div className="relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                      <div className="md:col-span-2 text-right md:w-150 w-auto">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                          هل تم إنجاز العمل؟
                        </h1>
                        <p className="text-blue-100 md:text-2xl text-lg mb-6 leading-relaxed">
                          لقد تواصلت مؤخراً مع الحرفي {lastRequest.firstName} {lastRequest.lastName}، يسعدنا معرفة مدى رضاك عن الخدمة المقدمة.
                        </p>

                        <div className="flex gap-4 md:flex-row">
                          <button 
                            onClick={() => handleUpdateStatus(lastRequest.requestID, 1)}
                            disabled={updateLoading}
                            className="cursor-pointer bg-primary hover:bg-primary/90 text-white w-28 font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50">
                            نعم
                          </button>
                          <button 
                            onClick={() => handleUpdateStatus(lastRequest.requestID, 2)}
                            disabled={updateLoading}
                            className="cursor-pointer bg-primary hover:bg-primary/90 text-white w-28 font-bold py-2 px-4 rounded-lg transition-colors disabled:opacity-50">
                            لا
                          </button>
                        </div>
                      </div>
                      <div>
                        <Image
                          src={cleanImageUrl(lastRequest.profileImageUrl)}
                          alt={`${lastRequest.firstName} ${lastRequest.lastName}`}
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

            {/* Current Active Contacts */}
            <div className="mb-12">
              <h2 className="text-2xl font-bold mb-6 text-right text-secondary border-r-4 border-primary pr-3">
                التواصلات الحالية النشطة
              </h2>

              {pendingRequests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-4">
                  {pendingRequests.map((req: ClientRequestType) => (
                    <div key={req.requestID} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
                      {/* Card Header */}
                      <div className="bg-linear-to-br from-primary/35 to-primary/5 p-4 text-center">
                        <Image
                          src={cleanImageUrl(req.profileImageUrl)}
                          alt={`${req.firstName} ${req.lastName}`}
                          width={70}
                          height={70}
                          className="mx-auto w-16 h-16 rounded-full object-cover mb-2 border-3 border-white"
                        />
                        <h2 className="text-lg font-bold text-secondary mb-2">{req.firstName} {req.lastName}</h2>
                        <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(req.status)}`}>
                          {getStatusLabel(req.status)}
                        </span>
                      </div>

                      <div className="p-4 space-y-3 text-right">
                        <div className="flex items-center justify-start gap-2 flex-row-reverse">
                          <span className="text-secondary font-medium text-sm">{req.requestTitle || "خدمة عامة"}</span>
                          <FaTools className="text-primary shrink" size={16} />
                        </div>
                        {req.requestDescription && (
                          <p className="text-gray-500 text-xs line-clamp-2 text-right">{req.requestDescription}</p>
                        )}
                      </div>
                      
                      {/* Hide phone contact because it does not return for active requests */}
                      <div className="px-4 pb-4">
                        <div className="text-center text-xs text-gray-400 bg-gray-50 py-2.5 rounded-lg font-bold">
                          رقم الاتصال متاح بعد إتمام الخدمة
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-8 text-center border border-dashed border-gray-200">
                  <p className="text-gray-500 text-sm">لا توجد تواصلات نشطة حالياً</p>
                </div>
              )}
            </div>

            {/* Previous Contacts */}
            <div>
              <h2 className="text-2xl font-bold mb-6 text-right text-secondary border-r-4 border-gray-300 pr-3">
                التواصلات السابقة
              </h2>

              {completedOrCancelledRequests.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6 gap-4">
                  {completedOrCancelledRequests.map((req: ClientRequestType) => (
                    <div key={req.requestID} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-100">
                      {/* Card Header */}
                      <div className="bg-linear-to-br from-primary/35 to-primary/5 p-4 text-center">
                        <Image
                          src={cleanImageUrl(req.profileImageUrl)}
                          alt={`${req.firstName} ${req.lastName}`}
                          width={70}
                          height={70}
                          className="mx-auto w-16 h-16 rounded-full object-cover mb-2 border-3 border-white"
                        />
                        <h2 className="text-lg font-bold text-secondary mb-2">{req.firstName} {req.lastName}</h2>
                        <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(req.status)}`}>
                          {getStatusLabel(req.status)}
                        </span>
                      </div>

                      <div className="p-4 space-y-3 text-right">
                        <div className="flex items-center justify-start gap-2 flex-row-reverse">
                          <span className="text-secondary font-medium text-sm">{req.requestTitle || "خدمة عامة"}</span>
                          <FaTools className="text-primary shrink" size={16} />
                        </div>
                        {req.requestDescription && (
                          <p className="text-gray-500 text-xs line-clamp-2 text-right">{req.requestDescription}</p>
                        )}
                      </div>

                      <div className="px-4 pb-4 space-y-2">
                        {req.phoneNumber ? (
                          <div className="flex gap-2">
                            <a 
                              href={`tel:${req.phoneNumber}`}
                              className="w-full bg-secondary hover:bg-secondary/90 text-white font-bold py-2.5 px-4 rounded-lg transition-colors duration-200 text-xs flex items-center justify-center gap-2 cursor-pointer"
                            >
                              <FaPhone size={14} />
                              اتصال
                            </a>
                            <a 
                              href={`https://wa.me/${req.phoneNumber.trim().replace(/\+/g, "").replace(/^00/, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-lg transition-colors duration-200 text-xs flex items-center justify-center gap-2 cursor-pointer"
                            >
                              واتساب
                            </a>
                          </div>
                        ) : (
                          <div className="text-center text-xs text-gray-400 bg-gray-50 py-2.5 rounded-lg font-bold">
                            بيانات الاتصال غير متوفرة
                          </div>
                        )}

                        {req.status === 1 && (
                          <button 
                            type="button"
                            onClick={() => {
                              setSelectedCraftsman({ id: req.craftsmanID, name: `${req.firstName} ${req.lastName}` });
                              setRatingModalOpen(true);
                            }}
                            className="w-full bg-primary hover:bg-primary/90 text-secondary cursor-pointer flex items-center justify-center font-bold py-2.5 px-4 rounded-lg text-sm transition-colors duration-200"
                          >
                            <FaStar size={16} className="fill-secondary text-secondary ml-1" />
                            <span>تقييم الخدمة</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-12 text-center border border-gray-100">
                  <p className="text-gray-500 text-sm">لا توجد تواصلات سابقة حالياً</p>
                </div>
              )}
            </div>
          </div>
        </CustomContainer>
      </section>

      {/* Rating Modal */}
      {selectedCraftsman && (
        <RatingModal
          isOpen={ratingModalOpen}
          onClose={() => {
            setRatingModalOpen(false);
            setSelectedCraftsman(null);
          }}
          craftsmanId={selectedCraftsman.id}
          craftsmanName={selectedCraftsman.name}
        />
      )}
    </>
  );
};

export default DashboardClient;

