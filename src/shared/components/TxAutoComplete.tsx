import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Dimensions,
  LayoutRectangle,
} from 'react-native';
import { Portal } from 'react-native-paper';


const deviceWidth = Dimensions.get('window').width;

export default function TxAutoComplete({ data, selectedValue, onSelect, placeholder, onQueryChange }: any) {
  const [query, setQuery] = useState('');
  const [showList, setShowList] = useState(false);
  const [dropdownPos, setDropdownPos] = useState<LayoutRectangle | null>(null);
  const inputRef = useRef<any>(null);

  const filtered = data.filter(
    (item: any) => item.name && query && item.name.toLowerCase().includes(query.toLowerCase()),
  );
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      onQueryChange(query);
    }, 200);
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [query, onQueryChange]);

  // React.useEffect(() => {
  //   // logger.debug('AutoComplete data:', data);
  //   // logger.debug('AutoComplete filtered:', filtered);
  // }, [data, filtered]);

  // Only measure input after showList is set to true, and after layout is complete
  React.useEffect(() => {
    if (showList) {
      // Delay to ensure input is rendered and visible
      setTimeout(() => {
        measureInput();
      }, 10);
    }
  }, [showList]);

  const measureInput = () => {
    // logger.debug('Measuring input...');
    inputRef.current?.measureInWindow((x: number, y: number, width: number, height: number) => {
      setDropdownPos({ x, y, width, height });
    });
  };

  // React state updates are asynchronous, so showList will not reflect the new value immediately after setShowList.
  // For debugging, use useEffect to log changes:
  React.useEffect(() => {
    if(!showList) {
      setQuery(selectedValue || query);
    }
  }, [showList]);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => {
        setQuery(item.name);
        setShowList(false);
        onSelect(item);
      }}
      style={styles.item}>
      <Text className='capitalize' style={styles.itemText}>{item.name ?? item.placeName}</Text>
    </TouchableOpacity>
  );

  return (
    < >
      <View style={{ position: 'relative' }}>
        <TextInput
          className='capitalize'
          ref={inputRef}
          value={query}
          onChangeText={(text) => {
            setQuery(text);
            setShowList(true);
          }}
          placeholder={placeholder}
          style={styles.input}
          onBlur={() => {}}
          onFocus={() => {
            setShowList(true);
          }}
        />
      </View>

      {showList && dropdownPos  && (
        <Portal>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setShowList(false)} />
          <View
            style={[
              styles.dropdown,
              {
                position: 'absolute',
                top: dropdownPos.y + dropdownPos.height,
                left: dropdownPos.x,
                width: dropdownPos.width,
                maxWidth: deviceWidth - 32,
              },
            ]}>
            <FlatList
              data={filtered}
              keyExtractor={(item) => item._id}
              renderItem={renderItem}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        </Portal>
      )}
    </>
  );
}
// export default React.memo(TxAutoComplete) as typeof TxAutoComplete;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
  },
  dropdown: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    maxHeight: 200,
  },
  item: {
    padding: 10,
  },
  itemText: {
    fontSize: 16,
  },
});
