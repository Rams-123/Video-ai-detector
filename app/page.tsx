"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/theme-toggles";
import { Separator } from "@radix-ui/react-separator";
import { Slider } from "@/components/ui/slider";
import {
  Camera,
  FlipHorizontal,
  PersonStanding,
  Video,
  Volume2,
} from "lucide-react";
import React, { useRef, useState } from "react";
import { Rings } from "react-loader-spinner";
import Webcam from "react-webcam";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

type Props = {};

const HomePage = (props: Props) => {
  const webcamRef = useRef<Webcam>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [mirrored, setMirrored] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [autoRecord, setAutoRecord] = useState(false);
  const [volume, setVolume] = useState(0.8);

  return (
    <div className="flex h-screen">
      {/* Left Division - webcam and canvas */}
      <div className="relative">
        <div className="relative flex h-screen w-full object-contain p-2">
          <Webcam
            ref={webcamRef}
            mirrored={mirrored}
            className="h-full w-full "
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 h-full w-full object-contain"
          ></canvas>
        </div>
      </div>

      {/* Right Division Container */}
      <div className="flex flex-row flex-1">
        <div className="border-primary/5 border-2 max-w-xs flex flex-col gap-3 justify-between shadow-md rounded-md p-4">
          {/* Top Section  */}
          <div className="flex flex-col gap-3">
            <ModeToggle />
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={() => {
                setMirrored((prev) => !prev);
              }}
            >
              <FlipHorizontal />
            </Button>

            <Separator className="my-2" />
          </div>

          {/* Middle Section */}
          <div className="flex flex-col gap-3">
            <Separator className="my-3" />
            <Button
              variant={"outline"}
              size={"icon"}
              onClick={userPromptScreenshot}
            >
              <Camera />
            </Button>

            <Button
              variant={isRecording ? "destructive" : "outline"}
              size={"icon"}
              onClick={userPromptRecord}
            >
              <Video />
            </Button>
            <Separator className="my-3" />

            <Button
              variant={autoRecord ? "destructive" : "outline"}
              size={"icon"}
              onClick={toggleAutoRecord}
            >
              {autoRecord ? (
                <Rings color="white" height={45} />
              ) : (
                <PersonStanding />
              )}
            </Button>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col gap-3">
            <Separator className="my-3" />

            <Popover>
              <PopoverTrigger>
                <Button variant={"outline"} size={"icon"}>
                  <Volume2 />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Slider max={1} min={0} step={0.8} defaultVolume={[volume]} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );

  // Handler Function
  function userPromptScreenshot() {
    // take picture
    // save it to downloads
  }

  function userPromptRecord() {
    // check if record
    // then stop recording
    // save it to downloads
    //if not recording
    // start recording
  }

  function toggleAutoRecord() {
    if (autoRecord) {
      setAutoRecord(false);
      toast("Auto Record is disabled");
      // show toast to user to notify the change
    } else {
      setAutoRecord(true);
      toast("Auto Record is enabled");
    }
  }
};

export default HomePage;
