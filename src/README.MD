# FE

<br/>
This folder include front-end file.

Our system first render index.js And go to App.js.

App.js has a router function. Without permission you will be redirected to the login page. However, if you have permission, App.js render page according to url.

then, App.js render page in components folder.

<br/>

## components Folder
---

<br/>

### Dashboard

<br/>


> If url is "/dashboard" App.js render index.jsx in dashboard folder.
Then index.jsx render table and index.jsx in sidebar.
>
> In site render, 
If site is fetching cloud data or you don't have data, site show loading. but if you have data, each part are show each cloud data. 
> 
> After render, if you select option on select box on upper right, site show to you that data for the cloud key of your choice. 
>
> Clicking the More history button or the sidebar menu will route to the URL corresponding to the button you selected.

<br/>

### Sidebar

<br/>

> Without setting page, all of page render sidebar. Sidebar's main function is route to other page. Also it provide logout and Refresh func. 

<br/>

### History

<br/>

> If url is "/history" App.js render index.jsx in history folder. Hisotry page provide information of CRUD cloud resource history. On our table, you can show all of cloud history after registry key on site. And if you click row of history, you can show detail of your history.

<br/>

### Visualization

<br/>

> If url is "/visualization" App.js render index.jsx in visualization folder. visualization page provide visualization of cloud resource architecture that Key that you register. 
>
> In Visualization page, you can highlight link resource when mouseover. 
>
>You can see the information of resource that left clicked.
>
> You can collapse cloud resources's child node by right click. 
>
>The last function is Create cloud resource. If you click the create button and put info of resource that you want, create resource on your cloud.
>If you Click collapse button on left-top, you can set visual setting what you want.

<br/>

### Resource

<br/>

> If url is "/resource/~" App.js render index.jsx in resource folder.
>
> Resource page provide state and simple data information of cloud resource. If you click the index, route to detail page that have more detail information. 
>
> If you click the checkbox, top bar onchange. On top bar have three icon. It's about delete and stop,run.
>
> In all of instance type provide delete function. Stop and run function is only provided to rds,ec2.
>
> After click, you can see the state of instance onchanged

<br/>

### Detail

<br/>

> If url is "/detail/~" App.js render index.jsx in detail folder. Detail page provide see the all of information about resource. 
>
> If information is big to show on your left or you click the view object, we show info on right.
>
> We provide modify function on this page. If you click modify button, render page to modify. In modify page, you can input data to modify resource data. After that, if you click the modify button, reload page and you can see data onchanged.

<br/>

### Scheduler

<br/>

> If url is "/scheduler" App.js render index.jsx in scheduler folder. Scheduler page provide information of scheduler that power on and off when you want. On our table, you can show all of scheduler after regist on our website. And it active automatically 

<br/>

### Passwd

<br/>

> When you first enter the site, App.js render Passwd and Form. It provide function that check the password that you input.

<br/>

## Manager Folder
---

<br/>

> Manager folder is tool as a easier modify data or fetch data.
