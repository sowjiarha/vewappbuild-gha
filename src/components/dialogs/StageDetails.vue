<template>
  <v-row justify="center">
      <!-- eslint-disable -->
    <v-dialog
      v-model="stageDialog"
      persistent
      max-width="1000px"
    >
      <v-card>
        <v-card-title class="pb-0">
            <v-row class="w-100 ma-0">
                <v-col cols="6"  class="pa-0">
                    <span class="text-h5">Stage details</span>
                </v-col>
                <v-col cols="2" class="pa-0">
                    <span style="font-size:16px !important;">Chat on behalf of </span>
                </v-col>
                <v-col cols="4"  class="pa-0">
                    <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
                    <v-autocomplete :rules="nameRules" :items="companyAdmins"
          item-text="display_name"
          item-value="user_id"
                  required class="pa-0 ma-0" outlined dense v-model="chat_on_behalf"></v-autocomplete>
                    </v-form>
                </v-col>
            </v-row>
          
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text style="max-height:500px; overflow-y:auto;">
          <v-container class="touchpointAdd" v-if="stageData && stageData.interactions">
              <div class="draggable-item d-flex my-2"
                    v-for="(q, qi) in stageData.interactions"
                    :key="qi"
                  >
                    <v-flex class="pa-0 my-1 action-card text-center" sm12>
                        <!-- <div class="actions d-flex flex-column"
                          v-if="qi !== 0"
                          :style="getDragPosition(q.type)"
                        >
                          <v-tooltip bottom>
                            <template v-slot:activator="{ on, attrs }">
                              <v-icon color="grey" class="mb-3 handle" v-bind="attrs" v-on="on">
                              las la-arrows-alt
                              </v-icon>
                            </template>
                              Move
                          </v-tooltip>
                        </div> -->

                        <div class="mb-1 box-container">
                        <div style="min-height:48px" class="d-flex flex-wrap flex-row">
                            <v-flex class="text-left">
                              <!-- <div class="d-flex" v-if="qi !== 0"> -->
                              <div v-if="qi !== 0">
                                <v-tooltip bottom>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-icon color="grey" class="handle pt-3 pl-3" v-bind="attrs" v-on="on">
                                    las la-arrows-alt
                                    </v-icon>
                                  </template>
                                    Move
                                </v-tooltip>
                              </div>
                            </v-flex>
                            <v-flex xs1 v-if="q.type !== 'text' && qi !== 0"
                              class="font-weight-bold pl-2 pt-2 mt-1"
                            >
                              Driver
                            </v-flex>
                            <v-flex v-if="q.type !== 'text' && qi !== 0" lay class="text-left driver-name" xs3>
                                <v-chip class="mt-1">{{q.driver}}</v-chip>
                            </v-flex>

                            <v-flex xs2 v-if="q.type !== 'text' && qi !== 0" class="font-weight-bold pl-2 pt-2 mt-1 text-left">
                              Sub Driver
                            </v-flex>
                            <v-flex v-if="q.type !== 'text' && qi !== 0" lay class="text-left sub-driver-name" xs3>
                              <v-chip class="mt-1">{{q.sub_driver}}</v-chip>
                            </v-flex>

                            <v-spacer> </v-spacer>

                            <v-flex xs2 class="text-center">
                              <div class="d-flex flex-row">
                                <v-flex xs4>
                                <v-tooltip bottom>
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-icon color="grey" class="mt-3" @click="editAction(q, qi, true)"
                                      v-bind="attrs"
                                      v-on="on"
                                    >
                                    las la-edit
                                    </v-icon>
                                  </template>
                                    Edit
                                </v-tooltip>
                                </v-flex>
                                <v-flex xs4 v-if="qi !== 0">
                                  <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-icon color="grey" class="mt-3" @click="deleteAction(qi)"
                                        v-bind="attrs"
                                        v-on="on"
                                      >las la-trash
                                      </v-icon>
                                    </template>
                                      Delete
                                  </v-tooltip>
                                </v-flex>
                                <v-flex xs4>
                                  <v-tooltip bottom>
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-icon color="grey" class="mt-3" @click="duplicateAction(q)"
                                        v-bind="attrs"
                                        v-on="on"
                                      >
                                      las la-copy
                                      </v-icon>
                                    </template>
                                      Copy
                                  </v-tooltip>
                                </v-flex>
                              </div>
                            </v-flex>
                            <v-flex xs12>
                            <v-divider></v-divider>
                            </v-flex>
                        </div>

                        <div class="pt-4 pa-3 d-flex flex-row flex-wrap align-center">
                            <!-- Scale -->
                            <v-flex class="offset-1" xs10 v-if="q.type === 'scale'">
                            <v-text-field
                                v-if="q.msg"
                                maxlength="300"
                                v-model="q.msg[0].text"
                                class="elevation-0 grey--text text--lighten-2"
                                name="interactionText"
                                label="Question"
                                autofocus
                                data-vv-as="interaction text"
                                v-validate="'required'"
                                single-line
                                disabled
                                outlined
                            >
                            </v-text-field>

                            <div class="d-flex flex-row flex-wrap justify-center"
                              v-if="q.msg && q.msg[0].scaleType === 'emoji'"
                            >
                                <v-flex xs2 class="text-center"
                                v-for="(r, ri) in q.msg[0].scale" :key="ri">
                                <v-menu
                                    absolute
                                    disabled
                                    offset-y
                                    style="max-width: 600px"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn class="emoji-btn"
                                    slot="activator"
                                    fab text rounded disabled
                                    v-bind="attrs"
                                    v-on="on"
                                    >
                                    <img v-if="r.img" style="width:20%;" :src="getImgUrl(r.img)"
                                    class="emoji-container" />
                                    </v-btn>
                                  </template>
                                    <v-list class="pa-3">
                                    <v-text-field
                                        class="grey--text text--lighten-2"
                                        maxlength="50"
                                        outlined
                                        v-model="r.title"
                                        flat
                                        @click.stop
                                        name="quickReply"
                                        :label="`Rating ${ri+1}`"
                                        disabled
                                    ></v-text-field>

                                    <v-text-field
                                        class="grey--text text--lighten-2"
                                        maxlength="300"
                                        outlined
                                        v-model="r.postback"
                                        flat
                                        @click.stop
                                        name="postback"
                                        label="Amara's response"
                                        disabled
                                    ></v-text-field>

                                    <v-flex xs12 class="text-right">
                                        <v-btn color="#0d2c8d" class="white--text" small disabled>
                                          Done
                                        </v-btn>
                                    </v-flex>
                                    </v-list>
                                </v-menu>
                                <p class="text-center">
                                    {{r.title}}
                                </p>
                                </v-flex>
                            </div>

                            <div class="d-flex flex-row flex-wrap justify-center"
                              v-if="q.msg && q.msg[0].scaleType === 'number'">
                                <v-flex xs2 class="text-center"
                                  v-for="(r, ri) in q.msg[0].scale" :key="ri"
                                >
                                <v-menu
                                    absolute
                                    offset-y
                                    disabled
                                    style="max-width: 600px"
                                >
                                  <template v-slot:activator="{ on, attrs }">
                                    <v-btn class="emoji-btn"
                                      :color="r.color"
                                      outlined
                                      text
                                      fab
                                      large
                                      v-bind="attrs"
                                      v-on="on"
                                      depressed
                                    >
                                      <strong class="headline">
                                        {{r.value}}
                                      </strong>
                                    </v-btn>
                                  </template>
                                    <v-list class="pa-3">
                                    <v-text-field
                                        class="grey--text text--lighten-2"
                                        maxlength="50"
                                        outlined
                                        v-model="r.title"
                                        flat
                                        disabled
                                        @click.stop
                                        name="quickReply"
                                        :label="`Rating ${ri+1}`"
                                    ></v-text-field>

                                    <v-text-field
                                        class="grey--text text--lighten-2"
                                        maxlength="300"
                                        outlined
                                        v-model="r.postback"
                                        flat
                                        disabled
                                        @click.stop
                                        name="postback"
                                        label="Amara's response"
                                    ></v-text-field>

                                    <v-flex xs12 class="text-right">
                                        <v-btn color="#0d2c8d"  class="white--text" small disabled>
                                          Done
                                        </v-btn>
                                    </v-flex>
                                    </v-list>
                                </v-menu>
                                <p class="text-center">
                                    {{r.title}}
                                </p>
                                </v-flex>
                            </div>
                            </v-flex>

                            <!-- Input from user -->
                            <v-flex class="offset-1" xs10 v-if="q.type === 'textInput'">
                            <v-text-field
                                maxlength="300"
                                v-model="q.msg['0'].text"
                                class="elevation-0 grey--text text--lighten-2"
                                :name="`interactionText_${qi}`"
                                label="Question"
                                autofocus
                                disabled
                                data-vv-as="interaction text"
                                v-validate="'required'"
                                single-line
                                outlined
                            >
                                <v-fade-transition slot="prepend">
                                <img width="30" height="30"
                                :src="getImgUrl('amara-60')">
                                </v-fade-transition>
                            </v-text-field>
                            </v-flex>

                            <!-- Text -->
                            <v-flex class="offset-1" xs10 v-if="q.type === 'text'">
                            <v-text-field
                                maxlength="300"
                                v-model="q.msg['0'].text"
                                class="elevation-0 grey--text text--lighten-2"
                                :name="`interactionText_${qi}`"
                                label="What should Amara say?"
                                autofocus
                                disabled
                                data-vv-as="interaction text"
                                v-validate="'required'"
                                single-line
                                outlined
                            >
                                <v-fade-transition slot="prepend">
                                <img width="30" height="30"
                                :src="getImgUrl('amara-60')">
                                </v-fade-transition>
                            </v-text-field>
                            </v-flex>

                            <!-- Image -->
                            <v-flex class="" v-if="q.type === 'image'">
                            <v-menu
                                absolute
                                v-if="q.msg"
                                offset-y
                                style="max-width: 600px"
                            >
                              <template v-slot:activator="{ on, attrs }">
                                <v-img
                                height="200"
                                width="300"
                                slot="activator"
                                v-bind="attrs"
                                v-on="on"
                                max-height="200"
                                max-width="300"
                                v-if="q.msg"
                                :src="q.msg[0].imgUrl"
                                :lazy-src="q.msg[0].imgUrl"
                                aspect-ratio="1"
                                class="grey lighten-2 mx-auto"
                                >
                                <div
                                  class="d-flex flex-row fill-height align-center justify-center ma-0"
                                  slot="placeholder"
                                >
                                  <div class="">
                                    <v-icon class="mr-2">las la-plus-square</v-icon>
                                    <strong class="mb-2">
                                      Add Image
                                    </strong>
                                    </div>
                                    <v-progress-circular v-show="q.msg && q.msg[0].imgUrl"
                                    indeterminate color="grey lighten-5">
                                    </v-progress-circular>
                                  </div>
                                </v-img>
                                </template>
                                <v-list class="pa-3">
                                <v-text-field
                                    maxlength="1000"
                                    outlined
                                    v-if="q.msg"
                                    v-model="q.msg[0].imgUrl"
                                    flat
                                    disabled
                                    @click.stop
                                    name="url"
                                    label="Your image URL"
                                ></v-text-field>
                                <v-flex xs12 class="text-right">
                                    <v-btn color="#0d2c8d"  class="white--text" small disabled>
                                      Done
                                    </v-btn>
                                </v-flex>
                                </v-list>
                            </v-menu>
                            </v-flex>

                            <!-- Card -->
                            <v-flex class="" v-if="q.type === 'card'">
                            <v-card class="mx-auto" width="300"
                                v-for="(c, ci) in q.msg" :key="ci"
                            >
                                <v-menu
                                absolute
                                offset-y
                                style="max-width: 600px"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                <v-img
                                  height="200"
                                  width="300"
                                  slot="activator"
                                  max-height="200"
                                  max-width="300"
                                  :src="c.imgUrl"
                                  v-bind="attrs"
                                  v-on="on"
                                  :lazy-src="c.imgUrl"
                                  aspect-ratio="1"
                                  class="grey lighten-2 mx-auto"
                                >
                                    <div
                                      class="d-flex flex-row fill-height align-center justify-center ma-0"
                                      slot="placeholder"
                                    >
                                    <div class="">
                                        <v-icon class="mr-2">las la-plus-square</v-icon>
                                        <strong class="mb-2">
                                        Add Image
                                        </strong>
                                    </div>
                                    <v-progress-circular v-show="c.imgUrl"
                                    indeterminate color="grey lighten-5">
                                    </v-progress-circular>
                                    </div>
                                </v-img>
                                </template>
                                <v-list class="pa-3">
                                    <v-text-field
                                    maxlength="1000"
                                    outlined
                                    v-model="c.imgUrl"
                                    flat
                                    disabled
                                    @click.stop
                                    name="url"
                                    label="Your image URL"
                                    ></v-text-field>
                                    <v-flex xs12 class="text-right">
                                    <v-btn color="#0d2c8d"  class="white--text" small disabled>
                                      Done
                                    </v-btn>
                                    </v-flex>
                                </v-list>
                                </v-menu>
                                <h3 class="headline mb-0 font-weight-bold w-100">
                                <v-text-field
                                    maxlength="300"
                                    solo
                                    v-model="c.text"
                                    flat
                                    disabled
                                    @click.stop
                                    name="cardTitle"
                                    label="Enter your message here"
                                ></v-text-field>
                                </h3>
                                <div>
                                <v-textarea
                                    maxlength="500"
                                    flat
                                    rows="2"
                                    solo
                                    disabled
                                    v-model="c.description"
                                    name="cardDescription"
                                    label="Enter card description here"
                                ></v-textarea>
                                </div>

                                <v-card-actions>
                                <div class="text-left">
                                    <v-menu v-for="(r, ri) in c.quickReplies" :key="ri"
                                    absolute
                                    offset-y
                                    disabled
                                    class="mb-1"
                                    style="width: 20em;"
                                    >
                                    <template v-slot:activator="{ on, attrs }">
                                    <v-btn color="#0d2c8d" block outlinedd slot="activator" v-bind="attrs" v-on="on">
                                    {{r.title}}</v-btn>
                                    </template>
                                    <v-list class="pa-3">
                                        <v-text-field
                                        class="grey--text text--lighten-2"
                                        maxlength="50"
                                        outlined
                                        v-model="r.title"
                                        flat
                                        disabled
                                        @click.stop
                                        name="quickReply"
                                        :label="`Rating ${ri+1}`"
                                        ></v-text-field>

                                        <v-text-field
                                        class="grey--text text--lighten-2"
                                        maxlength="300"
                                        outlined
                                        v-model="r.postback"
                                        flat
                                        disabled
                                        @click.stop
                                        name="postback"
                                        label="Amara's response"
                                        ></v-text-field>

                                        <v-flex xs12 class="text-right">
                                        <v-btn color="error" small text disabled
                                        @click="deleteReply(qi, ci, ri)">Delete</v-btn>
                                        <v-btn color="#0d2c8d"  class="white--text" small disabled>
                                          Done
                                        </v-btn>
                                        </v-flex>
                                    </v-list>
                                    </v-menu>

                                    <!-- Add new quick reply -->
                                    <p class="cursor-pointer mb-0 text-sm-center"
                                    v-if="c.quickReplies.length < 5"
                                    style="width: 20em;" @click="addReplies(qi, ci, 'Button')">
                                    <v-btn color="accent" class="mr-2" small outlined icon disabled>
                                        <v-icon small>las la-plus</v-icon>
                                    </v-btn>Add reply
                                    </p>
                                </div>
                                </v-card-actions>
                            </v-card>
                            </v-flex>

                            <!-- Carousel -->
                            <v-flex class="" v-if="q.type === 'carousel'">
                            <div class="flex-row flex-wrap d-flex">
                                <v-card class="mr-3" width="300"
                                  v-for="(c, ci) in q.msg" :key="ci"
                                >
                                <v-menu
                                    absolute
                                    disabled
                                    offset-y
                                    style="max-width: 600px"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-img
                                    height="200"
                                    width="300"
                                    v-bind="attrs"
                                    v-on="on"
                                    slot="activator"
                                    max-height="200"
                                    max-width="300"
                                    :src="c.imgUrl"
                                    :lazy-src="c.imgUrl"
                                    aspect-ratio="1"
                                    class="grey lighten-2 mx-auto"
                                    >
                                    <div
                                      class="d-flex flex-wrap flex-row fill-height align-center justify-center ma-0"
                                      slot="placeholder"
                                    >
                                        <div class="">
                                        <v-icon class="mr-2">las la-plus-square</v-icon>
                                        <strong class="mb-2">
                                            Add Image
                                        </strong>
                                        </div>
                                        <v-progress-circular v-show="c.imgUrl"
                                        indeterminate color="grey lighten-5">
                                        </v-progress-circular>
                                    </div>
                                    </v-img>
                                </template>
                                    <v-list class="pa-3">
                                    <v-text-field
                                        maxlength="1000"
                                        outlined
                                        v-model="c.imgUrl"
                                        flat
                                        disabled
                                        @click.stop
                                        name="url"
                                        label="Your image URL"
                                    ></v-text-field>
                                    <v-flex xs12 class="text-right">
                                        <v-btn color="#0d2c8d"  class="white--text" small disabled>
                                          Done
                                        </v-btn>
                                    </v-flex>
                                    </v-list>
                                </v-menu>
                                <h3 class="headline mb-0 font-weight-bold w-100">
                                    <v-text-field
                                    maxlength="300"
                                    solo
                                    v-model="c.text"
                                    flat
                                    disabled
                                    @click.stop
                                    name="cardTitle"
                                    label="Enter your message here"
                                    ></v-text-field>
                                </h3>
                                <div>
                                    <v-textarea
                                    maxlength="500"
                                    flat
                                    disabled
                                    rows="2"
                                    solo
                                    v-model="c.description"
                                    name="cardDescription"
                                    label="Enter card description here"
                                    ></v-textarea>
                                </div>

                                <v-card-actions>
                                    <div class="text-left">
                                    <v-menu v-for="(r, ri) in c.quickReplies" :key="ri"
                                        absolute
                                        offset-y
                                        class="mb-1"
                                        style="width: 20em;"
                                    >
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-btn color="#0d2c8d" block outlinedd slot="activator" v-bind="attrs" v-on="on">
                                        {{r.title}}</v-btn>
                                    </template>
                                        <v-list class="pa-3">
                                        <v-text-field
                                            class="grey--text text--lighten-2"
                                            maxlength="50"
                                            outlined
                                            v-model="r.title"
                                            flat
                                            disabled
                                            @click.stop
                                            name="quickReply"
                                            :label="`Rating ${ri+1}`"
                                        ></v-text-field>

                                        <v-text-field
                                            class="grey--text text--lighten-2"
                                            maxlength="300"
                                            outlined
                                            v-model="r.postback"
                                            flat
                                            disabled
                                            @click.stop
                                            name="postback"
                                            label="Amara's response"
                                        ></v-text-field>

                                        <v-flex xs12 class="text-right">
                                            <v-btn color="error" small text
                                            @click="deleteReply(qi, ci, ri)" disabled>Delete</v-btn>
                                            <v-btn color="#0d2c8d"  class="white--text" small disabled>
                                              Done
                                            </v-btn>
                                        </v-flex>
                                        </v-list>
                                    </v-menu>

                                    <!-- Add new quick reply -->
                                    <p class="cursor-pointer mb-0 text-sm-center"
                                    v-if="c.quickReplies.length < 5"
                                    style="width: 20em;" @click="addReplies(qi, ci, 'Button')">
                                        <v-btn color="accent" class="mr-2" small disabled outlinedd icon>
                                        <v-icon small>las la-plus</v-icon>
                                        </v-btn>Add reply
                                    </p>
                                    </div>
                                </v-card-actions>
                                </v-card>
                                <!-- Add new quick reply -->
                                <v-card>
                                <p class="cursor-pointer mb-0 text-sm-center"
                                v-if="q.msg.length < 5"
                                style="width: 20em;" @click="addCard(qi)">
                                    <v-btn color="accent" class="mr-2" small disabled outlinedd icon>
                                    <v-icon small>las la-plus</v-icon>
                                    </v-btn>Add card
                                </p>
                                </v-card>
                            </div>
                            </v-flex>

                            <!-- Quick replies -->
                            <v-flex class="offset-1" xs10
                            v-if="q.type === 'quickReplies' || q.type === 'closeEnded'">
                            <v-text-field
                                v-if="q.msg"
                                maxlength="300"
                                class="elevation-0 grey--text text--lighten-2"
                                v-model="q.msg[0].text"
                                :name="`interactionText`"
                                label="Question"
                                autofocus
                                disabled
                                data-vv-as="interaction text"
                                v-validate="'required'"
                                single-line
                                outlined
                            >
                                <v-fade-transition slot="prepend">
                                <img width="30" height="30"
                                :src="getImgUrl('amara-60')">
                                </v-fade-transition>
                            </v-text-field>

                            <div class="text-left" v-if="q.msg">
                                <v-menu v-for="(c, ci) in q.msg[0].quickReplies" :key="ci"
                                absolute
                                disabled
                                offset-y
                                style="max-width: 600px"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                <v-btn color="#0d2c8d" outlinedd slot="activator" disabled v-bind="attrs" v-on="on">
                                  {{c.title}}
                                </v-btn>
                                </template>
                                <v-list class="pa-3">
                                    <v-text-field
                                    class="grey--text text--lighten-2"
                                    maxlength="50"
                                    outlined
                                    v-model="c.title"
                                    flat
                                    disabled
                                    @click.stop
                                    name="quickReply"
                                    :label="`Rating ${ci+1}`"
                                    ></v-text-field>

                                    <v-text-field
                                    class="grey--text text--lighten-2"
                                    maxlength="300"
                                    outlined
                                    v-model="c.postback"
                                    flat
                                    disabled
                                    @click.stop
                                    name="postback"
                                    label="Amara's response"
                                    ></v-text-field>

                                    <v-flex xs12 class="text-right">
                                    <v-btn color="error" small text
                                    v-if="q.type === 'quickReplies'"
                                    @click="deleteReply(qi, 0, ci)" disabled>Delete</v-btn>
                                    <v-btn color="#0d2c8d"  class="white--text" small disabled>
                                      Done
                                    </v-btn>
                                    </v-flex>
                                </v-list>
                                </v-menu>

                                <!-- Add new quick reply -->
                                <span class="cursor-pointer" @click="addReplies(qi, 0, 'Answer')"
                                v-if="q.msg && q.msg[0].quickReplies.length < 5
                                && q.type === 'quickReplies'">
                                <v-btn color="accent" small disabled outlinedd icon>
                                    <v-icon small>las la-plus</v-icon>
                                </v-btn>Add reply
                                </span>
                            </div>
                            </v-flex>

                        </div>
                        </div>
                    </v-flex>
                  </div>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="grey"
            text
            @click="stageDialog = false"
          >
            Close
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn v-if="!editView" :loading='loading'
            color="#050550"  style="color: white;"
            @click="validate()"
          >
            Activate
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
import { mapState } from 'vuex';
  export default {
    components: {
      axios
    },
    data: () => ({
      loading: false,
      nameRules: [
        v => !!v || 'This field is required',
      ],
      valid: true,
      stageDialog: false,
      items: ['foo', 'bar', 'fizz', 'buzz'],
      chat_on_behalf: '',
      dialogTouchpoint: false,
      editView: false,
      imageData: '',
      companyAdmins: [],
      stageData: null,
    }),
computed: {
    ...mapState({
      snackbar: state => state.snackbar,
      user: state => state.user
    })
  },
    methods: {
        getImgUrl (pet) {
        const images = require.context('@/assets/', false, /\.png$/);
        return images(`./${pet}.png`);
        },
        validate () {
          
            this.$refs.form.validate()
            setTimeout(() => {
                if (this.valid) {
                  this.loading = true;
                  this.liveStage()
                } else {
                  this.loading = false;
                }
            }, 1000);
        },
        getAdmins (id) {
        axios.defaults.headers.common.Authorization = `JWT ${this.user.access_token}`;
        axios.get(`${process.env.VUE_APP_API_URL}users/admins/${id}`).then((response) => {
          if (response && response.data) {
            this.companyAdmins = response.data.data;
            // console.log(this.company);
          }
        }).catch((err) => {
          if (err.response.status === 429) {
            this.config.savingStage = false;
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: err.response.data.error
            });
          } else {
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Unable to fetch details, Please try again later!'
            });
          }
        });
      },
        liveStage () {
            axios.defaults.headers.common.Authorization = `JWT ${this.user.access_token}`;
        axios.patch(`${process.env.VUE_APP_API_URL}stage/update/${this.$parent.selectedStage}`, {
            chatFromUser_id: this.chat_on_behalf,
            status: 'live'
        }).then((response) => {
          if (response && response.data) {
              this.stageDialog = false;
              this.loading = false;
              this.$parent.getSatges(this.$route.query.cid);
              this.$store.dispatch('updateSnackbar', {
                color: 'success',
                show: true,
                text: 'Touchpoint activated!'
              });
            // this.$refs.stagedetails.stageDialog = true;
            // this.$refs.stagedetails.stageData = response.data;
            // console.log(this.company);
          }
        }).catch((err) => {
          if (err.response.status === 429) {
            this.loading = false;
            this.config.savingStage = false;
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: err.response.data.error
            });
          } else {
            this.loading = false;
            this.$store.dispatch('updateSnackbar', {
              color: 'error',
              show: true,
              text: 'Unable to fetch details, Please try again later!'
            });
          }
        });
        }
    },

    mounted() {
      this.getAdmins(this.$route.query.cid);
    }
  }
</script>

<style lang="scss">
.fileName {
    white-space: pre-wrap;
    vertical-align: middle;
    text-align: center;
    font-size: 1em;
    line-height: 1.5;
    display: inline-block;
    background: #f1f1f1;
    width:100%;
    padding: 45px 34px;
    font-family: Helvetica, Arial, sans-serif;
}
.touchpointAdd {
    input[type=file] {
        width:100%;
    }
    input[type=file]:before {
    content: 'Drag and drop or Click \A to add touchpoints.';
    white-space: pre-wrap;
    vertical-align: middle;
    text-align: center;
    font-size: 1em;
    line-height: 1.5;
    display: inline-block;
    background: #f1f1f1;
    width:100%;
    padding: 45px 34px;
    font-family: Helvetica, Arial, sans-serif;
    }

    input[type=file]::-webkit-file-upload-button {
    visibility: hidden;
    }
}
.draggable-item {
    border: 1px solid #dedede;
}

</style>