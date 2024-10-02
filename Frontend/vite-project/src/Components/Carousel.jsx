import  { useEffect } from "react"
import Glide from "@glidejs/glide"
import CarouslComponent from "./CarouslComponent"
import CarouselComomponenet2 from "./CarouselComomponenet2"

export default function SliderIndicatorsOutside() {
  useEffect(() => {
    const slider = new Glide(".glide-05", {
      type: "slider",
      focusAt: "center",
      perView: 1,
      autoplay: 3000,
      animationDuration: 700,
      gap: 0,
      classes: {
        nav: {
          active: "[&>*]:bg-wuiSlate-700",
        },
      },
    }).mount()

    return () => {
      slider.destroy()
    }
  }, [])

  return (
    <>
      {/*<!-- Component: Slider with indicators outside --> */}
      <div className="relative w-full glide-05">
        {/*    <!-- Slides --> */}
        <div className="overflow-hidden" data-glide-el="track">
          <ul className="whitespace-no-wrap flex-no-wrap [backface-visibility: hidden] [transform-style: preserve-3d] [touch-action: pan-Y] [will-change: transform] relative flex w-full overflow-hidden p-0">
           
            <li>
              <CarouslComponent/>
            </li>
            <li>
             <CarouselComomponenet2/>
            </li>
            
              
            
          </ul>
        </div>
        {/*    <!-- Indicators --> */}
        <div
          className="flex items-center justify-center w-full gap-2"
          data-glide-el="controls[nav]"
        >
           
      
        </div>
      </div>
      {/*<!-- End Slider with indicators outside --> */}
    </>
  )
}