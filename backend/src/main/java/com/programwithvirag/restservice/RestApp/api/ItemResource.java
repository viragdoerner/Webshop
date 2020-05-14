package com.programwithvirag.restservice.RestApp.api;

import com.programwithvirag.restservice.RestApp.model.Item;
import com.programwithvirag.restservice.RestApp.model.Ordermodel;
import com.programwithvirag.restservice.RestApp.service.ItemService;
import com.programwithvirag.restservice.RestApp.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/items")
@CrossOrigin(origins = "*")
public class ItemResource {

    @Autowired
    private OrderService orderService;
    @Autowired
    private ItemService itemService;

    @PostMapping
    // @PreAuthorize("hasRole('ADMIN')")
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

    @PutMapping
    //@PreAuthorize("hasRole('ADMIN')")
    public Item updateItem( @RequestBody Item item){
        return itemService.updateItem(item);
    }

    @DeleteMapping(value ="/{itemId}")
    //@PreAuthorize("hasRole('ADMIN')")
    public void deleteItem( @PathVariable int itemId){
        //kitörlöm az item kapcsolatait
        List<Ordermodel> allOrder = orderService.getOrderList();
        for(int i=0; i<allOrder.size(); i++){
            List<Item> items = allOrder.get(i).getItems();
            for(int j=0; j<items.size(); j++){
                if(items.get(j).getItemId() == itemId){
                    items.remove(j);
                }
            }
            orderService.updateItems(allOrder.get(i));
        }

        //kitörlöm az item-et
        itemService.deleteItem(itemId);
    }

}
