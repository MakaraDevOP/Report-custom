<template>
  <div class="overflow-y-scroll" style="height: 100vh">
    <div class="w-full h-auto pb-32">
      <!-- form -->
      <div
        class="bg-gray-100 mb-5 flex flex-row px-3 py-1"
        id="option-panel"
        :class="{
          'option-panel-expand': showOption,
          'option-panel-collapse': !showOption,
        }"
      >
        <div
          class="w-full flex flex-col items-start justify-start space-y-4 p-2"
          style="overflow: hidden"
        >
          <div class="flex flex-col justify-start items-start">
            <h1 class="text-2xl font-bold py-2 truncate">
              Profit and Loss Report
            </h1>
            <div
              class="flex items-center space-x-2 text-blue-400 cursor-pointer"
            >
              <span class="pi pi-angle-left"></span>
              <span>Back to report list</span>
            </div>
          </div>
          <div class="justify-start items-start space-y-2">
            <div class="text-start text-xs">
              <span>Report period</span>
            </div>
            <div class="flex flex-row space-x-3 items-center">
              <div class="">
                <input
                  class="p-inputtext p-inputtext-sm"
                  style="height: 30px"
                  type="text"
                />
              </div>
              <div class="">
                <Calendar
                  v-model="fromDate"
                  style="height: 30px; width: 130px"
                  class="text-xs"
                />
              </div>
              <p>to</p>
              <div class="">
                <Calendar
                  v-model="toDate"
                  style="height: 30px; width: 130px"
                  class="text-xs"
                />
              </div>
            </div>
          </div>
          <div class="w-full flex space-x-3 mt-5 text-xs">
            <div class="flex flex-col space-y-2">
              <label for="" class="flex justify-start truncate"
                >Display columns by</label
              >
              <Dropdown
                v-model="selectedDisplayConlumnOption"
                :options="displayConlumnOptions"
                optionLabel="name"
                placeholder="Select display columns"
                class="p-dropdown-sm flex items-center text-start w-full"
                style="height: 30px; width: 175px"
              />
            </div>
            <div class="flex flex-col space-y-2">
              <label for="" class="flex justify-start truncate"
                >Show non-zero or active only</label
              >
              <input
                class="p-inputtext p-inputtext-sm"
                style="height: 30px"
                type="text"
              />
            </div>
            <div class="flex flex-col space-y-2">
              <label for="" class="flex justify-start truncate"
                >Compare another period</label
              >
              <input
                class="p-inputtext p-inputtext-sm"
                style="height: 30px"
                type="text"
              />
            </div>
            <div class="flex flex-col space-y-2" style="width: 150px">
              <label for="" class="flex justify-start truncate"
                >Accounting method</label
              >
              <div class="flex flex-row items-center justify-between">
                <div class="flex items-center space-x-1">
                  <RadioButton></RadioButton> <label for="">Cash</label>
                </div>
                <div class="flex items-center space-x-1">
                  <RadioButton></RadioButton> <label for="">Accrual</label>
                </div>
              </div>
            </div>
            <div class="flex flex-col px-8" style="width: 150px">
              <Button
                label="Refresh"
                class="p-button-sm p-button-info p-button-outlined truncate"
                style="height: 30px !important"
              ></Button>
            </div>
          </div>
        </div>
        <div class="flex items-cemter justify-end">
          <div class="relative">
            <div
              class="
                absolute
                top-20
                right-0
                flex
                items-start
                justify-end
                space-x-2
              "
            >
              <Button
                @click="togglePrintOption"
                label="Customize"
                class="p-button-sm p-button-info p-button-outlined truncate"
                style="height: 35px !important"
              ></Button>
              <Button
                label="Save Customize"
                class="p-button-sm p-button-info truncate"
                style="height: 35px !important"
              ></Button>
            </div>

            <div
              @click="showMoreOption"
              class="
                cursor-pointer
                h-8
                w-8
                rounded
                bg-gray-100
                border border-blue-500
                text-blue-500
                absolute
                -bottom-4
                right-0
                flex
                items-center
                justify-center
              "
            >
              <span
                class="pi"
                :class="{
                  'pi-angle-up': showOption,
                  'pi-angle-down': !showOption,
                }"
              ></span>
            </div>
          </div>
        </div>
      </div>
      <!-- Table -->
      <div class="container mx-auto border h-auto p-2" style="width: 1200px">
        <TreeTable
          :value="nodes"
          :expandedKeys="expandedKeys"
          class="p-treetable-sm"
          :scrollable="true"
          :resizableColumns="true"
          columnResizeMode="fit"
          ref="dt"
          @node-expand="onNodeExpand"
          @node-collapse="onNodeCollapse"
        >
          <template #header>
            <div
              class="table-header items-center justify-between flex flex-col"
            >
              <div class="border-b p-2 flex justify-between w-full select-none">
                <div class="text-blue-500 flex space-x-3 text-sm">
                  <div class="cursor-pointer" @click="toggleExpand">
                    {{ labelExpand }}
                  </div>
                  <div class="cursor-pointer">Sort</div>
                  <div class="cursor-pointer">Add note</div>
                  <div class="cursor-pointer">Edit title</div>
                </div>
                <div class="flex space-x-3">
                  <div class="h-full cursor-pointer">
                    <span class="pi pi-wallet"></span>
                  </div>
                  <div class="h-full cursor-pointer">
                    <span class="pi pi-print"></span>
                  </div>
                  <div class="h-full cursor-pointer">
                    <span class="pi pi-upload"></span>
                  </div>
                  <div class="h-full cursor-pointer">
                    <span class="pi pi-cog"></span>
                  </div>
                </div>
              </div>
              <div class="border-b p-2 text-blue-300 w-full flex">
                <div
                  class="
                    flex flex-col
                    space-y-3
                    items-center
                    justify-center
                    w-full
                    pt-2
                    text-gray-800
                  "
                >
                  <h1 class="text-2xl">My Sample Company Group</h1>
                  <div class="flex items-center justify-center flex-col">
                    <h2>Profit and Loss</h2>
                    <h2>January 1 - June 26, 2022</h2>
                  </div>
                </div>
              </div>
            </div>
          </template>
          <Column
            field="name"
            :expander="true"
            class="flex justify-start items-start calibril"
          >
            <template #body="slotProp">
              <div
                class="bg-gray-100 w-full font-bold"
                v-if="slotProp.node.data.isSummary"
              >
                {{ slotProp.node.data.name }}
              </div>
              <div class="" v-else>{{ slotProp.node.data.name }}</div>
            </template>
          </Column>
          <Column
            field="amount"
            class="flex justify-end items-start calibril"
            style="padding: 0 10px 0 10px !important"
          >
            <template #header>
              <div class="py-2">
                <h1>Total</h1>
              </div>
            </template>
            <template #body="slotProp">
              <div
                class="bg-gray-100 text-end w-full font-bold"
                v-if="slotProp.node.data.isSummary"
              >
                {{ slotProp.node.data.amount }}
              </div>
              <div class="" v-else>{{ slotProp.node.data.amount }}</div>
            </template>
          </Column>
          <template #empty>
            <div
              class="w-full flex items-center justify-center"
              style="height: 200px"
            >
              <h1>This report does not contain any data.</h1>
            </div>
          </template>
        </TreeTable>
        <div class="w-full py-5 mt-2">
          <p>Accrual basis Monday, June 27, 2022 11:32 AM GMT+07:00</p>
        </div>
      </div>
    </div>
  </div>
  <Sidebar v-model:visible="sideBarPrintOptionVisible" position="right">
    Content
  </Sidebar>
</template>

<script>
import TreeTable from "primevue/treetable";
import Column from "primevue/column";
import Button from "primevue/button";
import Sidebar from "primevue/sidebar";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import RadioButton from "primevue/radiobutton";

export default {
  components: {
    TreeTable,
    Column,
    Button,
    Sidebar,
    Dropdown,
    Calendar,
    RadioButton,
  },
  data() {
    const nodes = [
      {
        key: "0",
        data: { name: "Income", amount: 29024.8 },
        children: [
          {
            key: "0-0",
            data: { name: "Design income", amount: 4875.0 },
            children: [
              { key: "0-0-0", data: { name: "Testing1", amount: 100 } },
              { key: "0-0-1", data: { name: "Testing2", amount: 100 } },
            ],
          },
          {
            key: "0-1",
            data: { name: "Discounts given", amount: -174.0 },
          },
          {
            key: "0-2",
            data: { name: "Landscaping Services", amount: 20334.0 },
          },
          {
            key: "0-3",
            data: { name: "Other Income", amount: 180.0 },
          },
          {
            key: "0-4",
            data: { name: "Sales of Product Income", amount: 2001.25 },
          },
          {
            key: "0-5",
            data: { name: "Services", amount: 288.55 },
          },
          {
            key: "0-6",
            data: { name: "Shipping Income", amount: 15.0 },
          },
        ],
      },
      {
        key: "1",
        data: { name: "Applications", amount: 100 },
        children: [
          {
            key: "1-0",
            data: { name: "Applications", amount: 100 },
          },
          {
            key: "1-1",
            data: { name: "Applications", amount: 100 },
          },
        ],
      },
    ];

    const displayConlumnOptions = [
      { name: "Total Only", code: "NY" },
      { name: "Days", code: "RM" },
      { name: "Weeks", code: "LDN" },
      { name: "Moths", code: "IST" },
      { name: "Quar", code: "PRS" },
      { name: "Years", code: "PRS" },
      { name: "Customers", code: "PRS" },
      { name: "Vendors", code: "PRS" },
      { name: "Employees", code: "PRS" },
      { name: "Products/Serivces", code: "PRS" },
    ];

    return {
      nodes,
      displayConlumnOptions,
      tableExpand: false,
      labelExpand: "Expand",
      expandedKeys: {},
      sideBarPrintOptionVisible: false,
      showOption: false,
      selectedDisplayConlumnOption: "",
      fromDate: null,
      toDate: null,
    };
  },
  created() {},
  methods: {
    togglePrintOption() {
      this.sideBarPrintOptionVisible = !this.sideBarPrintOptionVisible;
    },
    toggleExpand() {
      if (this.tableExpand) {
        this.labelExpand = "Expand";
        this.collapseAll();
      } else {
        this.labelExpand = "Collapse";
        this.expandAll();
      }
      this.tableExpand = !this.tableExpand;
    },
    expandAll() {
      for (let node of this.nodes) {
        this.expandNode(node);
      }

      this.expandedKeys = { ...this.expandedKeys };
    },
    collapseAll() {
      this.expandedKeys = {};
    },
    expandNode(node) {
      if (node.children && node.children.length) {
        this.expandedKeys[node.key] = true;
        for (let child of node.children) {
          this.expandNode(child);
        }
      }
    },
    showMoreOption() {
      this.showOption = !this.showOption;
    },
    onNodeExpand(row) {
      // generate sammary section
      const data = {
        key: row.key + row.data.name,
        data: {
          name: `Total ${row.data.name}`,
          amount: `$ ${row.data.amount}`,
          isSummary: true,
        },
      };

      const index = this.nodes.findIndex((node) => node.key == row.key);
      this.nodes.splice(index + 1, 0, data);
      console.log(index);
      // this.nodes.push(data);
    },
    onNodeCollapse(row) {
      //! remove sammary section

      //find array location
      const index = this.nodes.findIndex(
        (node) => node.key == row.key + row.data.name
      );

      /**
       * function splice use to remove the object in array
       * param 1 it is the location of array that you wanna delete
       * param 2 number of object you wanna delete
       */
      this.nodes.splice(index, 1);
    },
  },
};
</script>

<style >
.p-treetable-header {
  padding: 0 !important;
}
.calibril {
  padding: 2px !important;
}
.p-treetable-toggler-icon {
  font-size: 0.65rem !important;
}
.p-treetable-toggler {
  width: 30px !important;
  height: 30px !important;
}
.p-treetable-toggler:focus {
  outline: 0;
}

#option-panel {
  transition: 300ms;
}
.option-panel-expand {
  height: 235px !important;
}
.option-panel-collapse {
  height: 165px !important;
}

.p-treetable-header {
  background-color: transparent !important;
}

.p-treetable-tbody {
  border: none;
  background-color: brown;
}
</style>