import { create } from "zustand";

const useHomeStore = create((set) => ({
  slides: [
    {
      id: 1,
      textUz: "Dubay, BAA",
      textRu: "Дубай, ОАЭ",
      textEng: "Dubai, UAE",
      descUz: "Quyoshli plyajlar va zamonaviy me'morchilik shahri.",
      descRu: "Город солнечных пляжей и современной архитектуры.",
      descEng: "A city of sunny beaches and modern architecture.",
      image:
        "https://res.cloudinary.com/dtljonz0f/image/upload/c_auto,ar_4:3,w_1920,g_auto/f_auto/q_auto/shutterstock_2414539851_ss_non-editorial_dcx0bm?_a=BAVARSAP0",
      price: "1500",
      day: "15",
    },
    {
      id: 2,
      textUz: "Istanbul, Turkiya",
      textRu: "Стамбул, Турция",
      textEng: "Istanbul, Turkey",
      descUz: "Tarixiy yodgorliklari bilan mashhur shahar.",
      descRu: "Город, известный своими историческими достопримечательностями.",
      descEng: "A city known for its historical landmarks.",
      image: "https://www.hotelgift.com/media/wp/HG/2024/02/mosque.jpg",
      price: "1200",
      day: "15",
    },
    {
      id: 3,
      textUz: "Parij, Fransiya",
      textRu: "Париж, Франция",
      textEng: "Paris, France",
      descUz: "Sevgi va romantika shahri.",
      descRu: "Город любви и романтики.",
      descEng: "The city of love and romance.",
      image:
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/15/6d/d6/paris.jpg?w=1200&h=-1&s=1",
      price: "2000",
      day: "15",
    },
  ],
  setSlides: (newSlides) => set({ slides: newSlides }),
}));

export default useHomeStore;
