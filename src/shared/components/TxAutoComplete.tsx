import React, { useEffect, useState, useRef } from "react";
import { Text, TouchableOpacity } from "react-native";
import Autocomplete from "react-native-autocomplete-input";

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
  const [showList, setShowList] = useState(true);

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

  return (
    <Autocomplete
      data={filtered}
      value={query}
      onChangeText={text => {
        setQuery(text);
        setShowList(true);
      }}
      placeholder={placeholder}
      flatListProps={{
        keyExtractor: (_, idx) => idx.toString(),
        renderItem: ({ item }) => (
          <TouchableOpacity
            onPress={() => {
              setQuery(item.name);
              setShowList(false);
              onSelect(item);
            }}
            className="px-3 py-3 border-0 bor border-gray-200 z-30"
          >
            <Text className="text-slate-800">{item.name}</Text>
          </TouchableOpacity>
        ),
      }}
      inputContainerStyle={{
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 8,
        backgroundColor: "white",
        // zIndex: -1,
      }}
      containerStyle={{
        position: 'relative',
        // zIndex: 10,
        backgroundColor: 'white',
      }}
      listContainerStyle={{
        position: 'absolute',
        top: '90%',
        left: 0,
        right: 0,
        borderWidth: 0,
        borderColor: 'red',
        borderBottomEndRadius: 8,
        borderBottomStartRadius: 8,
        marginTop: 4,
        backgroundColor: 'white',
        zIndex: 20,
        elevation: 5, // for Android shadow
        // shadowColor: '',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      }}
    />
  );
};

export default TxAutocomplete;
