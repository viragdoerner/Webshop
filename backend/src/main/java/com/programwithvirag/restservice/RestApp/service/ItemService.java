package com.programwithvirag.restservice.RestApp.service;

import com.programwithvirag.restservice.RestApp.model.Item;
import com.programwithvirag.restservice.RestApp.dao.ItemDAO;
import com.programwithvirag.restservice.RestApp.exception.ItemNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;
import java.util.concurrent.CopyOnWriteArrayList;

@Component
public class ItemService {

    @Autowired
    private ItemDAO itemDAO;
    //private int itemIdCount = 1;
    private List<Item> itemList = new CopyOnWriteArrayList<>();

    public Item addItem(Item item){
//        item.setItemId(itemIdCount);
//        itemList.add(item);
//        itemIdCount++;
        return itemDAO.save(item);
//        return item;
    }

    public List<Item> getItemList() {
        return itemDAO.findAll();
//        return itemList;
    }

    public Item getItem(int itemId){
       Optional<Item> optionalItem =  itemDAO.findById(itemId);

        if(!optionalItem.isPresent())
            throw new ItemNotFoundException("Item Record is not available...");

        return optionalItem.get();
    }

    public Item updateItem(int itemId) {

        Optional<Item> optionalItem = itemDAO.findById(itemId);

        if (!optionalItem.isPresent())
            throw new ItemNotFoundException("Item Record is not available...");

        Item item = itemDAO.findById(itemId).get();
        return itemDAO.save(item);
    }

    public void deleteItem(int itemId){
        itemDAO.deleteById(itemId);
    }

}
