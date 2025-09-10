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
  //   // console.log('AutoComplete data:', data);
  //   // console.log('AutoComplete filtered:', filtered);
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
    // console.log('Measuring input...');
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
          onBlur={() => {console.log('Input blurred, showList:', showList); }}
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
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setQuery(item.name);
                    setShowList(false);
                    onSelect(item);
                  }}
                  style={styles.item}>
                  <Text className='capitalize' style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        </Portal>
      )}
    </>
  );
}

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
