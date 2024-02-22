import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../shadcn_ui/ui/tabs";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
function FilterCarTabs() {

  return (
    <>
      <Tabs defaultValue="sedan" className="w-full ">
        <TabsList className="flex justify-center gap-5 ">
          <TabsTrigger
            value="sedan"
            className="w-fit vehicle-sell h-8 uppercase data-[state=active]:bg-purple   duration-500  rounded-md  text-sm data-[state=active]:text-white"
          >
            Sedan
          </TabsTrigger>
          <TabsTrigger
            value="SUV"
            className="w-fit vehicle-sell h-8 uppercase data-[state=active]:bg-purple   duration-500  rounded-md  text-sm data-[state=active]:text-white"
          >
            SUV
          </TabsTrigger>
          <TabsTrigger
            value="luxury"
            className="w-fit vehicle-sell h-8 uppercase data-[state=active]:bg-purple   duration-500  rounded-md  text-sm data-[state=active]:text-white"
          >
            Luxury
          </TabsTrigger>
          <TabsTrigger
            value="hatchback"
            className="w-fit vehicle-sell h-8 uppercase data-[state=active]:bg-purple   duration-500  rounded-md  text-sm data-[state=active]:text-white"
          >
            Hatchback
          </TabsTrigger>
        </TabsList>
        <TabsContent value="sedan">a</TabsContent>
        <TabsContent value="SUV">b</TabsContent>
        <TabsContent value="luxury">c</TabsContent>
        <TabsContent value="hatchback">d</TabsContent>
      </Tabs>
    </>
  );
}

export default FilterCarTabs;
