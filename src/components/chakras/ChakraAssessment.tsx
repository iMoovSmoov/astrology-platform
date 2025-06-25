'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';

const chakraInfo = [
  { name: 'Root', color: '#ef4444' },
  { name: 'Sacral', color: '#f97316' },
  { name: 'Solar Plexus', color: '#facc15' },
  { name: 'Heart', color: '#22c55e' },
  { name: 'Throat', color: '#3b82f6' },
  { name: 'Third Eye', color: '#6366f1' },
  { name: 'Crown', color: '#a855f7' },
];

export function ChakraAssessment() {
  const [levels, setLevels] = useState(chakraInfo.map(() => 50));
  const [showResults, setShowResults] = useState(false);

  function updateLevel(index: number, value: number) {
    setLevels((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chakra Assessment</CardTitle>
      </CardHeader>
      <CardContent>
        {!showResults ? (
          <div className="space-y-6">
            {chakraInfo.map((chakra, i) => (
              <div key={chakra.name} className="space-y-2">
                <label className="font-medium">{chakra.name} Chakra</label>
                <Slider
                  max={100}
                  step={1}
                  value={[levels[i]]}
                  onValueChange={(v) => updateLevel(i, v[0])}
                />
              </div>
            ))}
            <Button
              onClick={() => setShowResults(true)}
              className="mt-4 w-full"
            >
              See Results
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-center text-muted-foreground">
              Your Chakra Balance
            </p>
            {chakraInfo.map((chakra, i) => (
              <div key={chakra.name} className="space-y-1">
                <div className="flex justify-between text-sm font-medium">
                  <span>{chakra.name}</span>
                  <span>{levels[i]}%</span>
                </div>
                <Progress
                  value={levels[i]}
                  indicatorColor={chakra.color}
                  className="h-2 bg-gray-200"
                />
              </div>
            ))}
            <Button onClick={() => setShowResults(false)} className="w-full">
              Adjust Levels
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
