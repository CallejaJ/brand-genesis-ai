"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Monitor, Smartphone, Tablet, Download } from "lucide-react";
import { getLucideIconPath } from "@/lib/icons";
import { Button } from "@/components/ui/button";

interface FaviconPreviewProps {
  config: any;
}

export function FaviconPreview({ config }: FaviconPreviewProps) {
  const getSvgString = (size: number) => {
    const iconSize = size * 0.5;
    const iconOffset = (size - iconSize) / 2;

    let shapeElement = "";
    switch (config.shape) {
      case "circle":
        shapeElement = `<circle cx="${size / 2}" cy="${size / 2}" r="${
          size / 2
        }" fill="url(#gradient)" />`;
        break;
      case "square":
        shapeElement = `<rect width="${size}" height="${size}" fill="url(#gradient)" />`;
        break;
      default: // rounded
        shapeElement = `<rect width="${size}" height="${size}" rx="${
          size * 0.1875
        }" ry="${size * 0.1875}" fill="url(#gradient)" />`;
    }

    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${
        config.gradient.from
      };stop-opacity:1" />
      <stop offset="100%" style="stop-color:${
        config.gradient.to
      };stop-opacity:1" />
    </linearGradient>
  </defs>
  ${shapeElement}
  <g transform="translate(${iconOffset}, ${iconOffset})">
    <svg width="${iconSize}" height="${iconSize}" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      ${getLucideIconPath(config.icon)}
    </svg>
  </g>
</svg>`;
  };

  const generateSVG = (size: number) => {
    return `data:image/svg+xml,${encodeURIComponent(getSvgString(size))}`;
  };

  const handleDownload = () => {
    const svgString = getSvgString(512); // High res for download
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "brand-genesis-icon.svg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Size Previews */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">Different Sizes</h3>
          <Button
            variant="outline"
            size="sm"
            className="h-8 gap-2"
            onClick={handleDownload}
          >
            <Download className="w-4 h-4" />
            Download SVG
          </Button>
        </div>
        <div className="flex items-center gap-6">
          <div className="text-center space-y-2">
            <img
              src={generateSVG(16) || "/placeholder.svg"}
              alt="16x16 favicon"
              className="mx-auto"
            />
            <Badge variant="secondary" className="text-xs">
              16×16
            </Badge>
          </div>
          <div className="text-center space-y-2">
            <img
              src={generateSVG(32) || "/placeholder.svg"}
              alt="32x32 favicon"
              className="mx-auto"
            />
            <Badge variant="secondary" className="text-xs">
              32×32
            </Badge>
          </div>
          <div className="text-center space-y-2">
            <img
              src={generateSVG(64) || "/placeholder.svg"}
              alt="64x64 favicon"
              className="mx-auto"
            />
            <Badge variant="secondary" className="text-xs">
              64×64
            </Badge>
          </div>
        </div>
      </div>

      {/* Browser Simulation */}
      <div className="space-y-4">
        <h3 className="font-medium">Browser Preview</h3>
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-sm">
              <img src={generateSVG(16) || "/placeholder.svg"} alt="favicon" />
              <span className="text-muted-foreground">My Awesome Website</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Device Previews */}
      <div className="space-y-4">
        <h3 className="font-medium">Device Compatibility</h3>
        <div className="grid grid-cols-3 gap-4">
          <Card className="text-center p-4">
            <Monitor className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <div className="text-sm font-medium">Desktop</div>
            <img
              src={generateSVG(32) || "/placeholder.svg"}
              alt="desktop favicon"
              className="mx-auto mt-2"
            />
          </Card>
          <Card className="text-center p-4">
            <Tablet className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <div className="text-sm font-medium">Tablet</div>
            <img
              src={generateSVG(32) || "/placeholder.svg"}
              alt="tablet favicon"
              className="mx-auto mt-2"
            />
          </Card>
          <Card className="text-center p-4">
            <Smartphone className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
            <div className="text-sm font-medium">Mobile</div>
            <img
              src={generateSVG(32) || "/placeholder.svg"}
              alt="mobile favicon"
              className="mx-auto mt-2"
            />
          </Card>
        </div>
      </div>
    </div>
  );
}
