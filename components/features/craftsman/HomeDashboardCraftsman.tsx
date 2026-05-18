"use client";
import { FiEye, FiMessageSquare, FiStar, FiUser, FiPhone, FiPlay, FiUsers } from "react-icons/fi";
import Image from "next/image";

const HomeDashboardCraftsman = () => {
  // Mock Data
  const stats = [
    { id: 1, label: "إجمالي المشاهدات", value: "1,284", icon: FiEye, color: "text-blue-500", bg: "bg-blue-50" },
    { id: 2, label: "طلبات التواصل", value: "45", icon: FiMessageSquare, color: "text-green-500", bg: "bg-green-50" },
    { id: 3, label: "استكمال الحساب", value: "85%", icon: FiUser, color: "text-orange-500", bg: "bg-orange-50" },
    { id: 4, label: "متوسط التقييم", value: "4.9", icon: FiStar, color: "text-yellow-500", bg: "bg-yellow-50" },
  ];

  const recentClients = [
    { id: 1, name: "أحمد القحطاني", time: "منذ 5 دقائق", message: "هل يمكنك البدء في مشروع نجارة...", img: "/imgs/default_2.jpeg" },
    { id: 2, name: "سارة المنصور", time: "منذ ساعة", message: "شكراً لك على العمل الرائع، أريد...", img: "/imgs/default_2.jpeg" },
    { id: 3, name: "فيصل العتيبي", time: "منذ 3 ساعات", message: "بخصوص تسعيرة أعمال الكهرباء...", img: "/imgs/default_2.jpeg" },
  ];

  const projects = [
    { id: 1, img: "/imgs/default_2.jpeg" },
    { id: 2, img: "/imgs/default_2.jpeg" },
    { id: 3, img: "/imgs/default_2.jpeg" },
  ];

  return (
    <section className="space-y-8 animate-in fade-in duration-700 pb-10">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-secondary font-lemonada ةلا-1">لوحة التحكم</h1>
          <p className="text-gray-500 mt-1 text-lg">مرحباً بك مجدداً في  <span className="font-lemonada text-secondary">شُغلَة</span> </p>
        </div>
      </div>

      {/* Analysis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.id} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow">
            <div>
              <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
              <h3 className="text-2xl font-bold text-secondary mt-1">{stat.value}</h3>
            </div>
            <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
              <stat.icon size={24} />
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Sidebar Left: Recent Clients */}
        <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <FiUsers className="text-primary" size={20} />
            <h2 className="text-xl font-bold text-secondary">أحدث العملاء</h2>
          </div>
          <div className="space-y-4">
            {recentClients.map((client) => (
              <div key={client.id} className="p-4 rounded-2xl border border-gray-50 bg-gray-50/30 hover:bg-white hover:shadow-sm transition-all">
                <div className="flex items-center gap-3">
                  <Image src={client.img} alt={client.name} width={45} height={45} className="rounded-full object-cover" />
                  <div>
                    <h4 className="font-bold text-secondary text-sm">{client.name}</h4>
                    <p className="text-[10px] text-gray-400">{client.time}</p>
                  </div>
                </div>
                <p className="text-gray-500 text-xs mt-3 line-clamp-1">{client.message}</p>
              </div>
            ))}
          </div>
          <button className="mt-8 text-primary text-sm font-bold hover:underline self-center">عرض جميع الرسائل ←</button>
        </div>

        {/* Center/Right Content: Profile & Projects */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Professional Profile Card */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <h2 className="text-xl font-bold text-secondary mb-8 flex items-center gap-2">
              <FiUser className="text-primary" /> السيرة المهنية والبيانات
            </h2>
            
            <div className="space-y-8">
              <div>
                <label className="text-gray-400 text-xs block mb-3 uppercase tracking-wider font-semibold">نبذة عني (About)</label>
                <div className="p-5 bg-gray-50/50 rounded-2xl text-secondary leading-relaxed border border-gray-50 text-md italic">
                  "أنا صنايعي متخصص في أعمال النجارة والتشطيبات بخبرة تزيد عن 10 سنوات في السوق السعودي. أهتم جداً بأدق التفاصيل لضمان جودة العمل ورضا العميل التام. أسعى دائماً لتقديم حلول مبتكرة تلبي تطلعات أصحاب المنازل والمشاريع."
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="text-gray-400 text-xs block mb-3 uppercase tracking-wider font-semibold">رقم التواصل</label>
                  <div className="flex items-center gap-4 p-5 bg-gray-50/50 rounded-2xl border border-gray-50 font-bold text-secondary text-lg">
                    <FiPhone className="text-primary" size={20} /> +966 5X XXX XXXX
                  </div>
                </div>
                <div>
                  <label className="text-gray-400 text-xs block mb-3 uppercase tracking-wider font-semibold">فيديو تعريفي</label>
                  <div className="relative group cursor-pointer overflow-hidden rounded-2xl h-[65px] border-2 border-dashed border-gray-200 hover:border-primary transition-colors">
                     <div className="absolute inset-0 bg-secondary/80 flex items-center justify-center text-white gap-3 transition-all hover:bg-secondary">
                        <FiPlay size={20} /> <span className="text-sm font-bold">مشاهدة الفيديو التعريفي</span>
                     </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Projects Gallery Card */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-secondary flex items-center gap-2">
                <FiStar className="text-primary" /> معرض أعمالي السابقة
                </h2>
                <span className="text-gray-400 text-sm">{projects.length} مشاريع معروضة</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {projects.map((project) => (
                <div key={project.id} className="relative aspect-square rounded-2xl overflow-hidden shadow-sm group border-4 border-white">
                  <Image 
                    src={project.img} 
                    alt="Project" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-secondary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                     <span className="text-white text-xs font-bold">عرض تفاصيل المشروع</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HomeDashboardCraftsman;