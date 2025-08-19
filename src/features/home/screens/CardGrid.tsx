import SmoothText from '@/shared/components/SmoothText';
import { ChevronDown } from 'lucide-react-native';
import React, { useState, useCallback, useRef, useEffect, ReactEventHandler } from 'react';
import { View, ActivityIndicator, TouchableOpacity, Text, Dimensions, ScrollView, NativeUIEvent, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';

const CARD_HEIGHT = 350; // Approximate height of your card
const SCREEN_HEIGHT = Dimensions.get('window').height;
const BUFFER = 2; // Extra items to render above/below viewport


type CardGridProps = {
  dishes: any[];
  itemsLoading: boolean;
  hasMoreItems: boolean;
  loadMoreDishes: () => void;
  renderDish: ({ item }: { item: any }) => React.ReactNode;
  theme: { colors: { primaryDark: string } };
};

const CardGrid: React.FC<CardGridProps> = ({ dishes, itemsLoading, hasMoreItems, loadMoreDishes, renderDish, theme }) => {
  {
    console.log('Loading in card grid, dishes.length:: ', dishes.length);
  const scrollRef = useRef<ScrollView>(null);
  const scrollYRef = useRef(0);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: 10 }); // Initial range
  const [prevDishesLength, setPrevDishesLength] = useState(0);
  
  // Track scroll position and update visible items
  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    scrollYRef.current = scrollY;
    const startIndex = Math.max(0, Math.floor(scrollY / CARD_HEIGHT) * 2 - BUFFER);
    const endIndex = Math.min(
      dishes.length - 1,
      Math.floor((scrollY + SCREEN_HEIGHT) / CARD_HEIGHT) * 2 + BUFFER * 2
    );
    setVisibleRange({ start: startIndex, end: endIndex });
  }, [dishes.length]);

  // Handle new items being loaded
  useEffect(() => {
    
    if (dishes.length > prevDishesLength) {
      // Maintain scroll position when new items are added
      const newItemsCount = dishes.length - prevDishesLength;
      const newEnd = Math.min(dishes.length - 1, visibleRange.end + newItemsCount);
      
      setVisibleRange(prev => ({
        start: prev.start,
        end: newEnd
      }));
    }
    setPrevDishesLength(dishes.length);
  }, [dishes.length]);

  // Calculate total height needed for scroll container
  const containerHeight = Math.ceil(dishes.length / 2) * CARD_HEIGHT;

  // Get only the items that should be visible
  const visibleItems = dishes.slice(visibleRange.start, visibleRange.end + 1);

  // Optimized load more handler
  const handleLoadMore = useCallback(async () => {
    if (!itemsLoading && hasMoreItems) {
      const currentScrollY = scrollYRef.current;
      await loadMoreDishes();
      requestAnimationFrame(() => {
        scrollRef.current?.scrollTo({ y: currentScrollY, animated: false });
      });
    }
  }, [itemsLoading, hasMoreItems, loadMoreDishes]);

  return (
    <View style={{ marginBottom: 20, flex: 1 }}>
      <ScrollView
        ref={scrollRef}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={{ height: containerHeight }}
      >
        {/* Virtualized container */}
        <View style={{ 
          position: 'relative', 
          height: containerHeight,
          paddingTop: Math.floor(visibleRange.start / 2) * CARD_HEIGHT
        }}>
          {visibleItems.map((item, index) => {
            const actualIndex = visibleRange.start + index;
            const row = Math.floor(actualIndex / 2);
            const col = actualIndex % 2;
            
            return (
              <View 
                key={`${item._id}_${actualIndex}`} // Unique key including index
                style={{
                  position: 'absolute',
                  width: '48%',
                  left: col === 0 ? '1%' : '51%',
                  top: row * CARD_HEIGHT - (Math.floor(visibleRange.start / 2) * CARD_HEIGHT),
                  height: CARD_HEIGHT,
                }}
              >
                {renderDish({ item })}
              </View>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer with improved loading state */}
      <View style={{ minHeight: 40 }}>
        {itemsLoading ? (
          <ActivityIndicator
            size="small"
            color={theme.colors.primaryDark}
            style={{ margin: 10 }}
          />
        ) : hasMoreItems ? (
          <TouchableOpacity
            onPress={handleLoadMore}
            style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 4 }}
            disabled={itemsLoading}
          >
            <Text style={{ color: '#3b82f6' }}>Load more</Text>
            <ChevronDown />
          </TouchableOpacity>
        ) : (
          <Text style={{ textAlign: "center", margin: 10, color: "#666" }}>
            No more items
          </Text>
        )}
      </View>
    </View>
  );
}};

export default React.memo(CardGrid);