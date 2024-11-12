import { useRef, useState } from 'react';


export function useHover() {
    const hoverRef = useRef(false);
    const originalColors = useRef(new Map());
    const [hoveredObject, setHoveredObject] = useState(null);

    const handlePointerOver = (event, object) => 
    {
        // Another check is needed here
        event.stopPropagation();
        if (!hoverRef.current) 
        {
            // Set Refs
            hoverRef.current = true;
            setHoveredObject(object);
            
            // Set Object materials to new values with emission
            object.traverse((child) => 
            {
                if (child.isMesh && child.material && 'emissive' in child.material) 
                {
                    const material = child.material;
                    if (!originalColors.current.has(child)) 
                    {
                        originalColors.current.set(child, { 
                            color: material.color.clone(),
                            emissive: material.emissive.clone(),
                            emissiveIntensity: material.emissiveIntensity || 1,
                        });
                    }
                    // Set Objects Emission Color and Intensity
                    material.emissive.set('rgb(255, 140, 0)');
                    material.emissiveIntensity = 0.25;
                }
                // Update cursor
                document.body.style.cursor = 'pointer';
            });
        }
    };

    const handlePointerOut = (event, object) => 
    {
        event?.stopPropagation();
        if (hoverRef.current) 
        {
            // Reset Refs
            hoverRef.current = false;
            setHoveredObject(null);

            // Reset Object materials to defaults using mapped values
            object.traverse((child) => {
                if (child.isMesh && child.material && originalColors.current.has(child)) {
                    const originalData = originalColors.current.get(child);
                    if (originalData) {
                        const material = child.material;
                        material.color.copy(originalData.color);
                        material.emissive.copy(originalData.emissive);
                        material.emissiveIntensity = originalData.emissiveIntensity;
                    }
                }
                // Update cursor
                document.body.style.cursor = 'default';
            });
        }
    };

    return { handlePointerOver, handlePointerOut, hoveredObject };
}