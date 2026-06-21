"use client";

import React, { useState } from "react";
import { useGetAllPersons, useChangeRole } from "@/hooks/control/useConrtol";
import { HiOutlineMagnifyingGlass, HiOutlineArrowPath } from "react-icons/hi2";
import LoadingComponent from "@/components/ui/LoadingComponent";
import ErrorComponent from "@/components/ui/ErrorComponent";

export default function AdminUsersPage() {
  const { data: persons, isLoading: loadingPersons, isError, refetch } = useGetAllPersons();
  const { mutate: changeUserRole } = useChangeRole();

  const [searchTerm, setSearchTerm] = useState("");
  const [updatingPersonId, setUpdatingPersonId] = useState<number | null>(null);

  const handleRoleChange = async (personId: number, newRole: string) => {
    setUpdatingPersonId(personId);
    try {
      await changeUserRole({ personId, role: newRole });
    } catch (err) {
      console.error("Failed to change user role:", err);
    } finally {
      setUpdatingPersonId(null);
    }
  };

  if (loadingPersons) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <LoadingComponent />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <ErrorComponent sectionName="إدارة المستخدمين" message="عذراً، فشل تحميل قائمة المستخدمين." />
      </div>
    );
  }

  // Filter users based on search
  const filteredPersons = persons?.filter((person) => {
    const name = `${person.firstName || ""} ${person.lastName || ""}`.toLowerCase();
    const email = (person.email || "").toLowerCase();
    const phone = (person.phoneNumber || "").toLowerCase();
    const search = searchTerm.toLowerCase();

    return name.includes(search) || email.includes(search) || phone.includes(search);
  }) || [];

  return (
    <div className="space-y-6 dir-rtl text-right" dir="rtl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-secondary font-lemonada">إدارة أدوار المستخدمين</h1>
          <p className="text-gray-400 text-xs md:text-sm mt-1">تصفح المستخدمين وقم بتعديل صلاحياتهم وأدوارهم بالمنصة.</p>
        </div>
        <button
          onClick={() => refetch()}
          className="flex items-center justify-center gap-2 border border-gray-200 bg-white hover:bg-gray-50 text-gray-600 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm shrink-0 cursor-pointer"
        >
          <HiOutlineArrowPath className="text-sm" />
          تحديث القائمة
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
          <HiOutlineMagnifyingGlass className="text-lg" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="البحث بالاسم، البريد الإلكتروني، أو رقم الهاتف..."
          className="w-full bg-transparent outline-none text-secondary placeholder:text-gray-300 font-bold text-xs md:text-sm"
        />
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-400 text-[10px] md:text-xs font-bold border-b border-gray-100">
                <th className="p-4">الاسم</th>
                <th className="p-4">البريد الإلكتروني</th>
                <th className="p-4">رقم الهاتف</th>
                <th className="p-4">الدور الحالي</th>
                <th className="p-4 text-left">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-xs md:text-sm">
              {filteredPersons.length > 0 ? (
                filteredPersons.map((person) => {
                  const roleLower = person.role?.toLowerCase() || "";
                  const isUpdating = updatingPersonId === person.personID;

                  return (
                    <tr key={person.personID} className="hover:bg-gray-50/50 transition-colors">
                      {/* Name */}
                      <td className="p-4 font-bold text-secondary">
                        {person.firstName} {person.lastName || ""}
                      </td>
                      
                      {/* Email */}
                      <td className="p-4 text-gray-500 font-medium">
                        {person.email || "غير متوفر"}
                      </td>

                      {/* Phone */}
                      <td className="p-4 text-gray-500 font-medium" dir="ltr">
                        {person.phoneNumber || "غير متوفر"}
                      </td>

                      {/* Role Badge */}
                      <td className="p-4">
                        {roleLower === "craftsman" ? (
                          <span className="bg-orange-100 text-orange-600 px-2.5 py-1 rounded-full text-[10px] font-bold">
                            حرفي / فني
                          </span>
                        ) : roleLower === "customer" || roleLower === "client" ? (
                          <span className="bg-emerald-100 text-emerald-600 px-2.5 py-1 rounded-full text-[10px] font-bold">
                            عميل
                          </span>
                        ) : roleLower === "admin" ? (
                          <span className="bg-blue-100 text-blue-600 px-2.5 py-1 rounded-full text-[10px] font-bold">
                            مدير النظام
                          </span>
                        ) : (
                          <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-full text-[10px] font-bold">
                            {person.role || "غير محدد"}
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-left">
                        <div className="flex items-center justify-end gap-2">
                          {isUpdating ? (
                            <div className="flex items-center gap-1.5 text-primary text-[11px] font-bold">
                              <div className="w-3.5 h-3.5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                              جاري الحفظ...
                            </div>
                          ) : (
                            <select
                              value={person.role}
                              disabled={isUpdating}
                              onChange={(e) => handleRoleChange(person.personID, e.target.value)}
                              className="bg-gray-50 hover:bg-gray-100 border border-gray-200 text-secondary text-[11px] font-bold px-3 py-1.5 rounded-lg outline-none cursor-pointer transition-colors"
                            >
                              <option value="customer">تحويل كعميل</option>
                              <option value="craftsman">تحويل كحرفي</option>
                              {roleLower === "admin" && <option value="admin">مدير النظام</option>}
                            </select>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400">
                    لا يوجد مستخدمين يطابقون معايير البحث.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
