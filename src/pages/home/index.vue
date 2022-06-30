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
        <TreeTable :value="dataTree">
          <Column field="name" header="Name" :expander="true"></Column>
          <Column field="total" header="Total"></Column>
        </TreeTable>
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
import jsonData from "../../Data/report-profit-and-loss.json";

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
      displayConlumnOptions,
      tableExpand: false,
      labelExpand: "Expand",
      expandedKeys: {},
      sideBarPrintOptionVisible: false,
      showOption: false,
      selectedDisplayConlumnOption: "",
      fromDate: null,
      toDate: null,

      report_header: null,
      report_option: null,
      report_rows: null,
      jsonData: jsonData,
      dataTree: null,
    };
  },
  created() {
    this.report_header = jsonData.report_header;
    this.report_rows = jsonData.report_rows;

    this.convertObjTree(this.report_rows);
  },
  methods: {
    convertObjTree(reportData) {
      var objData = [];
      reportData.forEach((items) => {
        if (items.parent_id == 0) {
          objData.push({
            id: items.id,
            data: {
              name: items.name,
              name_in_khmer: items.name_in_khmer,
              total: items.total,
            },
            children: this.getChildren(items.id),
          });
        }
      });
      this.dataTree = objData;
    },
    getChildren(id) {
      var objData = [];
      const hasChilds = this.report_rows.filter((items) => {
        return items.parent_id == id;
      });
      //check filter hase items or childs
      if (hasChilds.length > 0) {
        hasChilds.forEach((items) => {
          objData.push({
            id: items.id,
            data: {
              name: items.name,
              name_in_khmer: items.name_in_khmer,
              total: items.total,
            },
            children: this.getChildren(items.id),
          });
        });
      }
      return objData;
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