<template>
  <div class="flex bg-gray-100">
    <div class="flex flex-col">
      <div class="bg-white py-2 h-14 shadow-b-md">
        <div class="flex">
          <div class="w-1/2"> </div>
          <div class="w-1/2 flex space-x-2 justify-end items-center px-3">
            <div class="flex space-x-2 justify-end items-center">
              <Button icon="pi pi-print" class="p-button-sm" />
              <Button
                icon="pi pi-cog"
                class="p-button-sm p-button-secondary"
                @click="displayNav = !displayNav"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="w-full overflow-x-auto px-5 reports-scroll"
        style="height: calc(100vh - 8rem)"
        :style="
          displayNav != true
            ? 'width: calc(100vw'
            : 'width: calc(100vw - 24rem);'
        "
      >
        <div class="h-full mx-auto border my-5 h-auto" style="width: 1024px">
          <div class="w-full bg-white py-5">
            <div class="flex">
              <div class="w-1/4">
                <div class="p-3">
                  <div
                    v-if="editInfo"
                    class="flex justify-start items-center space-x-2"
                  >
                    <Checkbox
                      v-model="showLogo"
                      :binary="true"
                      id="show_logo"
                    />
                    <label class="text-xs" for="show_logo">Show Logo</label>
                  </div>
                  <img
                    v-if="showLogo"
                    :src="report_header.report_company_preference.logo_url"
                    alt=""
                  />
                </div>
              </div>
              <div class="w-2/4">
                <div class="w-full flex flex-col justify-center items-center">
                  <InputText
                    v-if="editInfo"
                    type="text"
                    class="p-inputtext-sm font-khmer text-sky-500 w-96"
                    v-model="Company_name"
                  />
                  <h1 v-else class="text-xl font-bold">
                    {{ Company_name }}
                  </h1>
                  <div class="py-2">
                    <InputText
                      v-if="editInfo"
                      type="text"
                      class="p-inputtext-sm text-sky-500 w-56"
                      v-model="Reporttype"
                    />
                    <h1 v-else class="text-lg font-bold">
                      {{ Reporttype }}
                    </h1>
                    <p class="font-khmer py-2">{{
                      report_header.report_subtitle
                    }}</p>
                  </div>
                </div>
              </div>
              <div class="w-1/4 flex justify-end items-end">
                <Button
                  v-if="editInfo"
                  label="Save Update"
                  icon="pi pi-check-circle"
                  class="p-button-info p-button-sm"
                  @click="editInfo = false"
                />
                <!-- <Button
                v-if="editInfo"
                icon="pi pi-bookmark"
                label="Save"
                class="p-button-rounded p-button-secondary p-button-sm"
                @click="editInfo = false"
              /> -->
              </div>
            </div>
          </div>
          <TreeTable
            :value="baseData"
            class="p-treetable-sm"
            style="margin-bottom: 2rem"
            :resizableColumns="true"
            :expandedKeys="expandedKeys"
            :metaKeySelection="true"
            @node-expand="expand"
            @node-collapse="collapse"
            @node-select="seclected"
            selectionMode="single"
            v-model:selectionKeys="key"
          >
            <Column field="name" header="" :expander="true">
              <template #body="slotProps">
                <span
                  class="text-xs"
                  :class="
                    slotProps.node.data.row == 'SummaryRow'
                      ? 'font-bold  total-row'
                      : ''
                  "
                >
                  {{ slotProps.node.data.name }}</span
                >
              </template>
            </Column>
            <Column field="total" header="Total" headerStyle="width: 8em">
              <template #body="slotProps">
                <span
                  class="text-xs"
                  :class="
                    slotProps.node.data.row == 'SummaryRow' ||
                    slotProps.node.children.length > 0
                      ? 'font-bold  total-row'
                      : ''
                  "
                >
                  {{ formatCurrency_deci(slotProps.node.data.total) }}</span
                >
              </template>
            </Column>
          </TreeTable>
        </div>
      </div>
    </div>
    <div
      class="w-96 bg-gray-50 h-auto overflow-hidden relative flex flex-col justify-between"
      v-show="displayNav"
    >
      <div class="option">
        <div class="py-3 text-left px-10">
          <h2 class="font-bold text-xl"
            >Option Report
            <span class="font-bold text-sky-600 text-xl"
              >Profit and Lost</span
            ></h2
          >
        </div>
        <div
          class="report_period flex flex-col px-10 justify-start items-start"
        >
          <p class="text-sm py-2">Report period</p>
          <Dropdown
            v-model="selectedPeriod"
            :options="periodData"
            class="w-64"
            optionLabel="name"
            optionValue="code"
            placeholder="Select reports period"
          />
          <p class="text-sm py-2">From</p>
          <Calendar
            id="basic"
            v-model="date1"
            class="w-64"
            autocomplete="off"
          />
          <p class="text-sm py-2">To</p>
          <Calendar
            id="basic"
            v-model="date1"
            class="w-64"
            autocomplete="off"
          />
        </div>
        <div
          class="report_period flex flex-col px-10 justify-start items-start"
        >
          <p class="text-sm py-2">Display columns by</p>
          <Dropdown
            v-model="selectedPeriod"
            :options="periodData"
            class="w-64"
            optionLabel="name"
            optionValue="code"
            placeholder="Select reports period"
          />
          <p class="text-sm py-2"> Show non-zero or active only</p>
          <Dropdown
            v-model="selectedGroupedCity"
            :options="groupedCities"
            optionLabel="label"
            class="w-64"
            optionGroupLabel="label"
            optionGroupChildren="items"
          >
            <template>
              <div class="flex align-items-center country-item">
                <h5>Basic</h5>
                <div class="field-radiobutton">
                  <RadioButton
                    id="city1"
                    name="city"
                    value="Chicago"
                    v-model="city"
                  />
                  <label for="city1">Chicago</label>
                </div>
                <div class="field-radiobutton">
                  <RadioButton
                    id="city2"
                    name="city"
                    value="Los Angeles"
                    v-model="city"
                  />
                  <label for="city2">Los Angeles</label>
                </div>
                <div class="field-radiobutton">
                  <RadioButton
                    id="city3"
                    name="city"
                    value="New York"
                    v-model="city"
                  />
                  <label for="city3">New York</label>
                </div>
                <div class="field-radiobutton">
                  <RadioButton
                    id="city4"
                    name="city"
                    value="San Francisco"
                    v-model="city"
                  />
                  <label for="city4">San Francisco</label>
                </div>
              </div>
            </template>
          </Dropdown>
          <p class="text-sm py-2"> Compare another period</p>
          <Calendar
            id="basic"
            v-model="date1"
            class="w-64"
            autocomplete="off"
          />
        </div>
      </div>

      <div class="run_report">
        <div class="flex flex flex-col px-10 justify-start items-start py-5">
          <Button label="Run Report" class="p-button-sm" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TreeTable from "primevue/treetable";
import Column from "primevue/column";
import Button from "primevue/button";

import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import RadioButton from "primevue/radiobutton";
import jsonData from "../../Data/report-profit-and-loss.json";
import InputText from "primevue/inputtext";
import Checkbox from "primevue/checkbox";

export default {
  components: {
    TreeTable,
    Column,
    Button,
    Dropdown,
    Calendar,
    RadioButton,
    InputText,
    Checkbox,
  },
  data() {
    const periodData = [
      {name: "Total Only", code: "1"},
      {name: "Days", code: "2"},
      {name: "Weeks", code: "3"},
      {name: "Moths", code: "4"},
      {name: "Quar", code: "5"},
      {name: "Years", code: "6"},
      {name: "Customers", code: "7"},
      {name: "Vendors", code: "8"},
      {name: "Employees", code: "9"},
      {name: "Products/Serivces", code: "10"},
    ];

    return {
      expandedKeys: {},
      showOption: false,
      selectedDisplayConlumnOption: "",
      fromDate: null,
      toDate: null,
      report_header: null,
      report_option: null,
      report_rows: null,
      jsonData: jsonData,
      baseData: null,
      key: "",
      Reporttype: "Profit and Lost",
      Company_name: "",
      editInfo: false,
      showLogo: true,
      displayNav: true,
      periodData,
      selectedPeriod: "",
    };
  },
  created() {
    this.report_header = this.jsonData.report_header;
    this.baseData = this.jsonData.report_rows;
  },
  mounted() {
    (this.Company_name =
      this.report_header.report_company_preference.name_of_enterprise),
      this.expandAll();
  },
  methods: {
    collapseAll() {
      this.expandedKeys = {};
    },

    expand(node) {
      this.expandedKeys = {...this.expandedKeys};
      node.data.total = node.data.prevtotal;
    },

    collapse(node) {
      this.expandedKeys = {...this.expandedKeys};
      var dataHead = node.data;
      var dataChild = node.children;
      dataHead.prevtotal = dataHead.total;
      dataHead.total = this.findSummary(dataChild);
    },
    findSummary(data) {
      var total = null;
      for (var x of data) {
        if (x.data.row == "SummaryRow") {
          total = x.data.total;
        }
      }
      return total;
    },
    //ការចុចលើ  record  ទាំងអស់
    seclected(node) {
      if (node.children.length > 0) {
        this.expandedKeys[node.key] = !this.expandedKeys[node.key];
        if (this.expandedKeys[node.key] == true) {
          this.expand(node);
        } else {
          this.collapse(node);
        }
      }
    },
    //*ការបើក record row ណាមួយ
    expandAll() {
      for (let node of this.baseData) {
        this.expandNode(node);
      }
      this.expandedKeys = {...this.expandedKeys};
    },
    expandNode(node) {
      if (node.children && node.children.length) {
        this.expandedKeys[node.key] = true;
        for (let child of node.children) {
          this.expandNode(child);
        }
      }
    },

    // ការបំលែងប្រាក់
    formatCurrency_deci(value) {
      let val;
      if (value != null) {
        val = parseFloat(value)
          .toFixed(2)
          .replace(/\d(?=(\d{3})+\.)/g, "$&,");
        val.toLocaleString("en-US");
      } else {
        val = value;
      }
      return val;
    },

    formatCurrency(value) {
      if (value != null) {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(value);
      }
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Khmer&display=swap");
.font-khmer {
  font-family: "Khmer", cursive;
}
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
.p-treetable.p-treetable-sm .p-treetable-tbody > tr > td {
  padding: 0.1rem 0.1rem;
}
.p-treetable-toggler {
  width: 23px !important;
  height: 15px !important;
  z-index: 1 !important;
}
.p-treetable .p-treetable-tbody > tr > td .p-treetable-toggler:focus {
  outline: 0 none;
  outline-offset: 0;
  box-shadow: none !important;
  z-index: 1 !important;
}
.p-treetable .p-treetable-tbody > tr > td .p-treetable-toggler:enabled:hover {
  color: #495057;
  border-color: transparent;
  background: none !important;
  z-index: 1 !important;
}
.p-treetable .p-treetable-tbody > tr.p-highlight .p-treetable-toggler {
  color: #495057;
  font-size: 8px !important;
  z-index: 1 !important;
}
.reports-scroll::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.reports-scroll {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>
