/** SVG visual parameters for a coffee mug style. */
export interface MugConfig {
  cupTop: number;
  cupBottom: number;
  viewBoxHeight: number;
  aspectRatio: string;
  cupPath: string;
  clipPath: string;
  handleOuter: string;
  handleInner: string;
  handleStrokeWidth: number;
  cupGradientStops: { offset: string; color: string }[];
  rimInnerFill: string;
  rimStroke: string;
  cremaRy: number;
  shadowCy: number;
  shadowRx: number;
  /** Left x-coordinate of the cup body (excluding handle). */
  cupLeft: number;
  /** Right x-coordinate of the cup body (excluding handle). */
  cupRight: number;
}

/** Configuration for a single coffee type. */
export interface CoffeeType {
  id: string;
  name: string;
  defaultSeconds: number;
  mug: MugConfig;
}

export const COFFEE_TYPES: CoffeeType[] = [
  {
    id: "espresso",
    name: "Espresso",
    defaultSeconds: 900,
    mug: {
      cupTop: 110,
      cupBottom: 220,
      viewBoxHeight: 240,
      aspectRatio: "15/12",
      cupPath: "M35 110 Q32 195 55 220 L125 220 Q148 195 145 110 Z",
      clipPath: "M35 110 Q32 195 55 220 L125 220 Q148 195 145 110 Z",
      handleOuter: "M145 130 Q180 130 180 160 Q180 190 145 190",
      handleInner: "M145 138 Q172 138 172 160 Q172 182 145 182",
      handleStrokeWidth: 13,
      cupGradientStops: [
        { offset: "0%", color: "#D9C4AD" },
        { offset: "18%", color: "#F0E4D4" },
        { offset: "42%", color: "#FFF6EA" },
        { offset: "58%", color: "#FFF6EA" },
        { offset: "82%", color: "#F0E4D4" },
        { offset: "100%", color: "#D9C4AD" },
      ],
      rimInnerFill: "#F5EBE0",
      rimStroke: "#E0D2C2",
      cremaRy: 8,
      shadowCy: 232,
      shadowRx: 72,
      cupLeft: 35,
      cupRight: 145,
    },
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    defaultSeconds: 1200,
    mug: {
      cupTop: 85,
      cupBottom: 220,
      viewBoxHeight: 240,
      aspectRatio: "15/14",
      cupPath: "M32 85 Q24 180 52 220 L128 220 Q156 180 148 85 Z",
      clipPath: "M32 85 Q24 180 52 220 L128 220 Q156 180 148 85 Z",
      handleOuter: "M148 108 Q190 108 190 150 Q190 185 148 185",
      handleInner: "M148 118 Q180 118 180 150 Q180 176 148 176",
      handleStrokeWidth: 16,
      cupGradientStops: [
        { offset: "0%", color: "#D4C4B5" },
        { offset: "18%", color: "#EDE4DA" },
        { offset: "42%", color: "#FFF8F0" },
        { offset: "58%", color: "#FFF8F0" },
        { offset: "82%", color: "#EDE4DA" },
        { offset: "100%", color: "#D4C4B5" },
      ],
      rimInnerFill: "#F5EDE3",
      rimStroke: "#E0D5C8",
      cremaRy: 10,
      shadowCy: 232,
      shadowRx: 76,
      cupLeft: 32,
      cupRight: 148,
    },
  },
  {
    id: "americano",
    name: "Americano",
    defaultSeconds: 1500,
    mug: {
      cupTop: 75,
      cupBottom: 220,
      viewBoxHeight: 240,
      aspectRatio: "15/15",
      cupPath: "M30 75 Q24 190 48 220 L132 220 Q156 190 150 75 Z",
      clipPath: "M30 75 Q24 190 48 220 L132 220 Q156 190 150 75 Z",
      handleOuter: "M150 100 Q195 100 195 148 Q195 188 150 188",
      handleInner: "M150 112 Q183 112 183 148 Q183 178 150 178",
      handleStrokeWidth: 18,
      cupGradientStops: [
        { offset: "0%", color: "#CFC3B8" },
        { offset: "18%", color: "#E8E0D8" },
        { offset: "42%", color: "#F8F4EE" },
        { offset: "58%", color: "#F8F4EE" },
        { offset: "82%", color: "#E8E0D8" },
        { offset: "100%", color: "#CFC3B8" },
      ],
      rimInnerFill: "#F0EAE4",
      rimStroke: "#DBD3CB",
      cremaRy: 9,
      shadowCy: 232,
      shadowRx: 80,
      cupLeft: 30,
      cupRight: 150,
    },
  },
];
