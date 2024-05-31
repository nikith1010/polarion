#set($projectID = $page.getReference().projectId())
#set($collections = $transaction.baselineCollections().search().query("project.id:$projectID"))
<table class="collections">
<tr>
    <th class="collections">Collections</th>
    <th class="collections">Work Items</th>
    <th class="collections">Linked Work Items</th>
</tr>
#foreach($collection in $collections)
<tr>
<td>$collection.render<br></td>
<td>
#set($workitem = $collection.getOldApi().getCustomField("workitem"))
#if($workitem)
    $workitem.getName()
#end
</td>
<td>
#set($workitem = $collection.getOldApi().getCustomField("workitem"))
##$workitem
#set($wi = $trackerService.getWorkItem($projectID, $workitem.getId))
#set($linkedWorkItems = $wi.getLinkedWorkItems())   
#foreach($a in $linkedWorkItems)

      #set($linkedWorkItem = $transaction.objects.getForOldApiObject($a))
      $linkedWorkItem.render.withLinks().openLinksInNewWindow()
     #set($linkedRevisions = $linkedWorkItem.getLinkedRevisions())
      #foreach($rev in $linkedRevisions)
                  $rev.getId()<br>
     #end
      
#end 
</td>
</tr>
#end
</table>
