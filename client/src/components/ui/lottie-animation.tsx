import { useEffect, useRef } from 'react';
import Lottie from 'lottie-react';

interface LottieAnimationProps {
  animationData: any;
  width?: number | string;
  height?: number | string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
}

export function LottieAnimation({
  animationData,
  width = 200,
  height = 200,
  loop = true,
  autoplay = true,
  className = ""
}: LottieAnimationProps) {
  const lottieRef = useRef<any>();

  const defaultOptions = {
    loop,
    autoplay,
    animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <div className={className} style={{ width, height }}>
      <Lottie
        {...defaultOptions}
        lottieRef={lottieRef}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

// Mental health themed animation data (inline JSON for wellness icons)
export const heartbeatAnimation = {
  "v": "5.7.4",
  "fr": 60,
  "ip": 0,
  "op": 60,
  "w": 200,
  "h": 200,
  "nm": "Heartbeat",
  "ddd": 0,
  "assets": [],
  "layers": [
    {
      "ddd": 0,
      "ind": 1,
      "ty": 4,
      "nm": "Heart",
      "sr": 1,
      "ks": {
        "o": {"a": 0, "k": 100},
        "r": {"a": 0, "k": 0},
        "p": {"a": 0, "k": [100, 100, 0]},
        "a": {"a": 0, "k": [0, 0, 0]},
        "s": {
          "a": 1,
          "k": [
            {"i": {"x": [0.667], "y": [1]}, "o": {"x": [0.333], "y": [0]}, "t": 0, "s": [100]},
            {"i": {"x": [0.667], "y": [1]}, "o": {"x": [0.333], "y": [0]}, "t": 15, "s": [120]},
            {"i": {"x": [0.667], "y": [1]}, "o": {"x": [0.333], "y": [0]}, "t": 30, "s": [100]},
            {"i": {"x": [0.667], "y": [1]}, "o": {"x": [0.333], "y": [0]}, "t": 45, "s": [120]},
            {"t": 60, "s": [100]}
          ]
        }
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "ind": 0,
              "ty": "sh",
              "ks": {
                "a": 0,
                "k": {
                  "i": [[0, 0], [0, 0], [0, 0], [0, 0]],
                  "o": [[0, 0], [0, 0], [0, 0], [0, 0]],
                  "v": [[-20, -10], [0, -20], [20, -10], [0, 15]],
                  "c": true
                }
              }
            },
            {
              "ty": "fl",
              "c": {"a": 0, "k": [0.929, 0.325, 0.267, 1]},
              "o": {"a": 0, "k": 100}
            }
          ]
        }
      ],
      "ip": 0,
      "op": 60,
      "st": 0
    }
  ]
};

export const breathingAnimation = {
  "v": "5.7.4",
  "fr": 30,
  "ip": 0,
  "op": 120,
  "w": 200,
  "h": 200,
  "nm": "Breathing Circle",
  "ddd": 0,
  "assets": [],
  "layers": [
    {
      "ddd": 0,
      "ind": 1,
      "ty": 4,
      "nm": "Circle",
      "sr": 1,
      "ks": {
        "o": {"a": 0, "k": 100},
        "r": {"a": 0, "k": 0},
        "p": {"a": 0, "k": [100, 100, 0]},
        "a": {"a": 0, "k": [0, 0, 0]},
        "s": {
          "a": 1,
          "k": [
            {"i": {"x": [0.42], "y": [1]}, "o": {"x": [0.58], "y": [0]}, "t": 0, "s": [80]},
            {"i": {"x": [0.42], "y": [1]}, "o": {"x": [0.58], "y": [0]}, "t": 60, "s": [120]},
            {"t": 120, "s": [80]}
          ]
        }
      },
      "ao": 0,
      "shapes": [
        {
          "ty": "gr",
          "it": [
            {
              "d": 1,
              "ty": "el",
              "s": {"a": 0, "k": [60, 60]},
              "p": {"a": 0, "k": [0, 0]}
            },
            {
              "ty": "fl",
              "c": {"a": 0, "k": [0.231, 0.510, 0.965, 0.8]},
              "o": {"a": 0, "k": 100}
            }
          ]
        }
      ],
      "ip": 0,
      "op": 120,
      "st": 0
    }
  ]
};