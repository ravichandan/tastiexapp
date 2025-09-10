import React, { useEffect, useState, useRef } from "react";
import { Text, TouchableOpacity, View, TextInput, Modal, FlatList, StyleSheet, Platform, Dimensions, Pressable } from "react-native";

type TxAutocompleteProps<T> = {
  data: T[]; // list of items to search from
  placeholder?: string;
  onSelect: (item: T) => void; // callback when user selects
  onQueryChange: (query: string) => void; // callback when query changes
};

const TxAutocomplete = <T extends { _id: string; name: string }>(
  props: TxAutocompleteProps<T>
) => {
  const { data, placeholder = "Search...", onSelect, onQueryChange } = props;
  const [query, setQuery] = useState("");
  const [showList, setShowList] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const [inputLayout, setInputLayout] = useState<{x: number, y: number, width: number, height: number}>();
  const [dropdownPos, setDropdownPos] = useState<{top: number, left: number, width: number} | null>(null);

  // Debounce query changes before firing onQueryChange
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    if (!onQueryChange || query.length < 2) return;
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      onQueryChange(query);
    }, 200);
    return () => {
      if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    };
  }, [query, onQueryChange]);

  // Filter list based on query
  const filtered =
    showList && query.length > 0
      ? data.filter((item) =>
          item.name.toLowerCase().includes(query.toLowerCase())
        )
      : [];

  // Get device width for modal positioning
  const deviceWidth = Dimensions.get('window').width;

  // When input is focused and dropdown should show, measure its position in window
  const showDropdown = showList && filtered.length > 0;
  useEffect(() => {
    if (showDropdown && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.measureInWindow((x, y, width, height) => {
          setDropdownPos({
            top: y + height + 2,
            left: x,
            width: width,
          });
        });
      }, 10);
    }
  }, [showDropdown]);

  return (
    <>
      <View style={{ position: 'relative' }}>
        <TextInput
          ref={inputRef}
          value={query}
          onChangeText={text => {
            setQuery(text);
            setShowList(true);
          }}
          placeholder={placeholder}
          style={styles.input}
          onFocus={() => setShowList(true)}
        />
      </View>
      <Modal
        visible={showDropdown}
        transparent
        animationType="fade"
        onRequestClose={() => setShowList(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowList(false)} />
        {dropdownPos && (
          <View
            style={[
              styles.dropdown,
              {
                position: 'absolute',
                top: dropdownPos.top,
                left: dropdownPos.left,
                width: dropdownPos.width,
                maxWidth: deviceWidth - 32,
              },
            ]}
          >
            <FlatList
              data={filtered}
              keyExtractor={item => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => {
                    setQuery(item.name);
                    setShowList(false);
                    onSelect(item);
                  }}
                  style={styles.item}
                >
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              )}
              keyboardShouldPersistTaps="handled"
            />
          </View>
        )}
      </Modal>
    </>
  );
};


const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    fontSize: 16,
    height: 44,
  },
  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.05)',
    zIndex: 1,
  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    maxHeight: 220,
    zIndex: 2,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignSelf: 'center',
  },
  item: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
    color: '#222',
  },
});

export default TxAutocomplete;
