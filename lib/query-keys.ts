



export const QueryKeys = {
    craftsman: ["craftsman"],
    getCraftsmanById: (id: number) => ["craftsman", id],
    getCraftsmenByCategory: (CategoryID: number) => ["craftsmen-by-category", CategoryID],
    getAllSkills: ["skills"],
    getAllCategory: ["categories"],
    getAllRequests: ["request"]
}