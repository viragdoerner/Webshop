package com.programwithvirag.restservice.RestApp.api;

import com.programwithvirag.restservice.RestApp.model.Item;
import com.programwithvirag.restservice.RestApp.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/items")
@CrossOrigin(origins = "*")
public class ItemResource {


    @Autowired
    private ItemService itemService;

    @PostMapping
    public Item addItem( @RequestBody Item item){
        return itemService.addItem( item);
    }

    @GetMapping
    public List<Item> getItems(){
        return itemService.getItemList();
    }

    @GetMapping (value ="/{itemId}")
    public Item getItem( @PathVariable("itemId") int itemId){
        return itemService.getItem(itemId);
    }

    @PutMapping(value ="/{itemId}")
    public Item updateItem( @PathVariable int itemId){
        return itemService.updateItem(itemId);
    }

    @DeleteMapping(value ="/{itemId}")
    public void deleteItem( @PathVariable int itemId){
         itemService.deleteItem(itemId);
    }

}
