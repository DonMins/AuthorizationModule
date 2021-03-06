/**
 * extjs overrides
 */

Ext.override(Ext.form.field.Text, {
	setCaretPosition: function(pos) {
		var el = this.inputEl.dom;
		if (typeof(el.selectionStart) === "number")
		{
			el.focus();
			el.setSelectionRange(pos, pos);
		}
		else
		{
			if (!el.createTextRange)
				throw 'setCaretPosition() not supported';
			else
			{
				var range = el.createTextRange();
				range.move("character", pos);
				range.select();
			}
		}
	}
	, getCaretPosition: function() {
		var el = this.inputEl.dom;
		if (typeof(el.selectionStart) === "number")
			return el.selectionStart;
		else
		{
			if (!document.selection || !el.createTextRange)
				throw 'getCaretPosition() not supported';
			else
			{
				var range = document.selection.createRange();
				range.collapse(true);
				range.moveStart("character", -el.value.length);

				return range.text.length;
			}
		}
	}
});

//fixes issue with not resizing grid cell tooltip in IE:
//https://www.sencha.com/forum/showthread.php?260106-Tooltips-on-forms-and-grid-are-not-resizing-to-the-size-of-the-text&p=976013&viewfull=1#post976013
Ext.override(Ext.dom.Element, {
    getWidth: function(contentWidth, preciseWidth) {
        var me = this,
            dom = me.dom,
            hidden = me.isStyle('display', 'none'),
            rect, width, floating;

        if (hidden) {
            return 0;
        }

        if (Ext.supports.BoundingClientRect) {
            rect = dom.getBoundingClientRect();
            width = (me.vertical && !Ext.isIE9 && !Ext.supports.RotatedBoundingClientRect) ?
                (rect.bottom - rect.top) : (rect.right - rect.left);
            width = preciseWidth ? width : Math.ceil(width);
        } else {
            width = dom.offsetWidth;
        }

        if (Ext.supports.Direct2DBug && !me.vertical) {
            floating = me.adjustDirect2DDimension('width');
            if (preciseWidth) {
                width += floating;
            }
            else if (floating > 0 && floating < 0.5) {
                width++;
            }
        }

        if (contentWidth) {
            width -= me.getBorderWidth("lr") + me.getPadding("lr");
        }

        return (width < 0) ? 0 : width;
    }
});

Ext.override(Ext.form.field.Date, {
	startDay: 1
});

//fix issue with column emptyCellText ignored in 4.2.1
//https://www.sencha.com/forum/showthread.php?261494-4-2-0-The-option-emptyCellText-of-the-column-is-ignored
Ext.override(Ext.view.Table, {
    renderCell: function(column, record, recordIndex, columnIndex, out) {
        var me = this,
            selModel = me.selModel,
            cellValues = me.cellValues,
            classes = cellValues.classes,
            fieldValue = record.data[column.dataIndex],
            cellTpl = me.cellTpl,
            value, clsInsertPoint;

        cellValues.record = record;
        cellValues.column = column;
        cellValues.recordIndex = recordIndex;
        cellValues.columnIndex = columnIndex;
        cellValues.cellIndex = columnIndex;
        cellValues.align = column.align;
        cellValues.tdCls = column.tdCls;
        cellValues.innerCls = column.innerCls;
        cellValues.style = cellValues.tdAttr = "";
        cellValues.unselectableAttr = me.enableTextSelection ? '' : 'unselectable="on"';

        if (column.renderer && column.renderer.call) {
            value = column.renderer.call(column.scope || me.ownerCt, fieldValue, cellValues, record, recordIndex, columnIndex, me.dataSource, me);
            if (cellValues.css) {


                record.cssWarning = true;
                cellValues.tdCls += ' ' + cellValues.css;
                delete cellValues.css;
            }
        } else {
            value = fieldValue;
        }
        //cellValues.value = (value == null || value === '') ? '&#160;' : value;   //this is wrong, fix below
        cellValues.value = (value == null || value === '') ? column.emptyCellText : value;

        classes[1] = Ext.baseCSSPrefix + 'grid-cell-' + column.getItemId();

        clsInsertPoint = 2;

        if (column.tdCls) {
            classes[clsInsertPoint++] = column.tdCls;
        }
        if (me.markDirty && record.isModified(column.dataIndex)) {
            classes[clsInsertPoint++] = me.dirtyCls;
        }
        if (column.isFirstVisible) {
            classes[clsInsertPoint++] = me.firstCls;
        }
        if (column.isLastVisible) {
            classes[clsInsertPoint++] = me.lastCls;
        }
        if (!me.enableTextSelection) {
            classes[clsInsertPoint++] = Ext.baseCSSPrefix + 'unselectable';
        }

        classes[clsInsertPoint++] = cellValues.tdCls;
        if (selModel && selModel.isCellSelected && selModel.isCellSelected(me, recordIndex, columnIndex)) {
            classes[clsInsertPoint++] = (me.selectedCellCls);
        }

        classes.length = clsInsertPoint;

        cellValues.tdCls = classes.join(' ');

        cellTpl.applyOut(cellValues, out);

        cellValues.column = null;
    }
});

/**
 * Override method of grid editor to fix bug #3222
 * where editor wasn't added to row when docForm layout is complicated enough.
 * Added only this check: '!layoutView.componentLayout.initialized'.
 *
 * Note: if will be found reason why componentLayoutCounter isn't initialized and fixed - remove it.
 */
Ext.override(Ext.grid.plugin.Editing, {
    startEdit: function(record, columnHeader) {
        var me = this,
            context,
            layoutView = me.grid.lockable ? me.grid : me.view;

        // BUGFIX: added check to make sure componentLayout is not initialized before denying edit.
        if (!layoutView.componentLayoutCounter && !layoutView.componentLayout.initialized) {
            layoutView.on({
                boxready: Ext.Function.bind(me.startEdit, me, [record, columnHeader]),
                single: true
            });
            return false;
        }

        if (me.grid.collapsed || !me.grid.view.isVisible(true)) {
            return false;
        }

        context = me.getEditingContext(record, columnHeader);
        if (context == null) {
            return false;
        }
        if (!me.preventBeforeCheck) {
            if (me.beforeEdit(context) === false || me.fireEvent('beforeedit', me, context) === false || context.cancel) {
                return false;
            }
        }

        me.editing = true;
        return context;
    }
});

/**
 * Only increased watchDog from 100 to 200, to prevent scroll go to top in DocumentForm on listField update
 * Note: probably, it's may hang browser
 */
Ext.override(Ext.layout.Context, {
    run: function () {
        var me = this,
            flushed = false,
            maxIteration = 200,
            watchDog = maxIteration; // default is 100

        me.flushInvalidates();

        me.state = 1;
        me.totalCount = me.layoutQueue.getCount();

        me.flush();

        var time = performance.now();

        while ((me.remainingLayouts || me.invalidQueue.length) && watchDog--) {
            if (me.invalidQueue.length) {
                me.flushInvalidates();
            }

            if (me.runCycle()) {
                flushed = false;
            } else if (!flushed) {
                me.flush();
                flushed = true;

                me.flushLayouts('completionQueue', 'completeLayout');
            } else if (!me.invalidQueue.length) {
                me.state = 2;
                break;
            }

            if (!(me.remainingLayouts || me.invalidQueue.length)) {
                me.flush();
                me.flushLayouts('completionQueue', 'completeLayout');
                me.flushLayouts('finalizeQueue', 'finalizeLayout');
            }
        }

        if (watchDog === 0) {
            console.debug(
                'Warning! WatchDog expired! ' + maxIteration + ' iterations is not enough for this page. Time: ' +
                Math.floor(performance.now() - time) + ' ms.'
            );
        } else if (watchDog <= maxIteration - 100) {
            console.debug(
                'Default WatchDog exceeded: ' + (maxIteration - watchDog) + ' steps taken to render. Time: ' +
                Math.floor(performance.now() - time) + ' ms.'
            );
        }

        return me.runComplete();
    }
});

//is not implemented in 4.2.1
Ext.override(Ext.button.Button, {
    setMenu: function (menu, destroyMenu) {
        var me = this,
            oldMenu = me.menu;

        if (oldMenu && destroyMenu !== false && me.destroyMenu) {
            oldMenu.destroy();
        }

        if (oldMenu) {
            oldMenu.ownerCmp = oldMenu.ownerButton = null;
        }

        if (menu) {
            // Retrieve menu by id or instantiate instance if needed.
            menu = Ext.menu.Manager.get(menu);

            // Use ownerCmp as the upward link. Menus *must have no ownerCt* - they are global floaters.
            // Upward navigation is done using the up() method.
            menu.ownerCmp = menu.ownerButton = me;

            me.mon(menu, {
                scope: me,
                show: me.onMenuShow,
                hide: me.onMenuHide
            });

            // If the button wasn't initially configured with a menu or has previously been unset then we need
            // to poke the split classes onto the btnWrap dom element.
            if (!oldMenu) {
                me.split = true;
                if (me.rendered) {
                    me.btnWrap.addCls(me.getSplitCls());
                    me.updateLayout();
                }
            }

            me.menu = menu;
        } else {
            if (me.rendered) {
                me.btnWrap.removeCls(me.getSplitCls());
                me.updateLayout();
            }
            me.split = false;
            me.menu = null;
        }
    },
});

// added width alignment button (justifyfull)
Ext.override(Ext.form.field.HtmlEditor, {
    getToolbarCfg: function(){
        var me = this,
            items = [], i,
            tipsEnabled = Ext.quickTipsActive && Ext.tip.QuickTipManager.isEnabled(),
            baseCSSPrefix = Ext.baseCSSPrefix,
            fontSelectItem, undef;

        function btn(id, toggle, handler){
            return {
                itemId: id,
                cls: baseCSSPrefix + 'btn-icon',
                iconCls: baseCSSPrefix + 'edit-'+id,
                enableToggle:toggle !== false,
                scope: me,
                handler:handler||me.relayBtnCmd,
                clickEvent: 'mousedown',
                tooltip: tipsEnabled ? me.buttonTips[id] || undef : undef,
                overflowText: me.buttonTips[id].title || undef,
                tabIndex: -1
            };
        }


        if (me.enableFont && !Ext.isSafari2) {
            fontSelectItem = Ext.widget('component', {
                itemId: 'fontSelect',
                renderTpl: [
                    '<select id="{id}-selectEl" class="' + baseCSSPrefix + 'font-select">',
                    '</select>'
                ],
                childEls: ['selectEl'],
                afterRender: function() {
                    me.fontSelect = this.selectEl;
                    Ext.Component.prototype.afterRender.apply(this, arguments);
                },
                onDisable: function() {
                    var selectEl = this.selectEl;
                    if (selectEl) {
                        selectEl.dom.disabled = true;
                    }
                    Ext.Component.prototype.onDisable.apply(this, arguments);
                },
                onEnable: function() {
                    var selectEl = this.selectEl;
                    if (selectEl) {
                        selectEl.dom.disabled = false;
                    }
                    Ext.Component.prototype.onEnable.apply(this, arguments);
                },
                listeners: {
                    change: function() {
                        me.win.focus();
                        me.relayCmd('fontName', me.fontSelect.dom.value);
                        me.deferFocus();
                    },
                    element: 'selectEl'
                }
            });

            items.push(
                fontSelectItem,
                '-'
            );
        }

        if (me.enableFormat) {
            items.push(
                btn('bold'),
                btn('italic'),
                btn('underline')
            );
        }

        if (me.enableFontSize) {
            items.push(
                '-',
                btn('increasefontsize', false, me.adjustFont),
                btn('decreasefontsize', false, me.adjustFont)
            );
        }

        if (me.enableColors) {
            items.push(
                '-', {
                    itemId: 'forecolor',
                    cls: baseCSSPrefix + 'btn-icon',
                    iconCls: baseCSSPrefix + 'edit-forecolor',
                    overflowText: me.buttonTips.forecolor.title,
                    tooltip: tipsEnabled ? me.buttonTips.forecolor || undef : undef,
                    tabIndex:-1,
                    menu: Ext.widget('menu', {
                        plain: true,

                        items: [{
                            xtype: 'colorpicker',
                            allowReselect: true,
                            focus: Ext.emptyFn,
                            value: '000000',
                            plain: true,
                            clickEvent: 'mousedown',
                            handler: function(cp, color) {
                                me.relayCmd('forecolor', Ext.isWebKit || Ext.isIE ? '#'+color : color);
                                this.up('menu').hide();
                            }
                        }]
                    })
                }, {
                    itemId: 'backcolor',
                    cls: baseCSSPrefix + 'btn-icon',
                    iconCls: baseCSSPrefix + 'edit-backcolor',
                    overflowText: me.buttonTips.backcolor.title,
                    tooltip: tipsEnabled ? me.buttonTips.backcolor || undef : undef,
                    tabIndex:-1,
                    menu: Ext.widget('menu', {
                        plain: true,

                        items: [{
                            xtype: 'colorpicker',
                            focus: Ext.emptyFn,
                            value: 'FFFFFF',
                            plain: true,
                            allowReselect: true,
                            clickEvent: 'mousedown',
                            handler: function(cp, color) {
                                if (Ext.isGecko) {
                                    me.execCmd('useCSS', false);
                                    me.execCmd('hilitecolor', '#'+color);
                                    me.execCmd('useCSS', true);
                                    me.deferFocus();
                                } else {
                                    me.relayCmd(Ext.isOpera ? 'hilitecolor' : 'backcolor', Ext.isWebKit || Ext.isIE || Ext.isOpera ? '#'+color : color);
                                }
                                this.up('menu').hide();
                            }
                        }]
                    })
                }
            );
        }

        if (me.enableAlignments) {
            items.push(
                '-',
                btn('justifyleft'),
                btn('justifycenter'),
                btn('justifyfull'),
                btn('justifyright')
            );
        }

        if (!Ext.isSafari2) {
            if (me.enableLinks) {
                items.push(
                    '-',
                    btn('createlink', false, me.createLink)
                );
            }

            if (me.enableLists) {
                items.push(
                    '-',
                    btn('insertorderedlist'),
                    btn('insertunorderedlist')
                );
            }
            if (me.enableSourceEdit) {
                items.push(
                    '-',
                    btn('sourceedit', true, function(btn){
                        me.toggleSourceEdit(!me.sourceEditMode);
                    })
                );
            }
        }


        for (i = 0; i < items.length; i++) {
            if (items[i].itemId !== 'sourceedit') {
                items[i].disabled = true;
            }
        }



        return {
            xtype: 'toolbar',
            defaultButtonUI: me.defaultButtonUI,
            cls: Ext.baseCSSPrefix + 'html-editor-tb',
            enableOverflow: true,
            items: items,


            listeners: {
                click: function(e){
                    e.preventDefault();
                },
                element: 'el'
            }
        };
    },
    updateToolbar: function() {
        var me = this,
            i, l, btns, doc, name, queriedName, fontSelect,
            toolbarSubmenus;

        if (me.readOnly) {
            return;
        }

        if (!me.activated) {
            me.onFirstFocus();
            return;
        }

        btns = me.getToolbar().items.map;
        doc = me.getDoc();

        if (me.enableFont && !Ext.isSafari2) {


            queriedName = doc.queryCommandValue('fontName');
            name = (queriedName ? queriedName.split(",")[0].replace(/^'/,'').replace(/'$/,'') : me.defaultFont).toLowerCase();
            fontSelect = me.fontSelect.dom;
            if (name !== fontSelect.value || name != queriedName) {
                fontSelect.value = name;
            }
        }

        function updateButtons() {
            var state;

            for (i = 0, l = arguments.length, name; i < l; i++) {
                name  = arguments[i];



                try {
                    state = doc.queryCommandState(name);
                }
                catch (e) {
                    state = false;
                }

                btns[name].toggle(state);
            }
        }
        if(me.enableFormat){
            updateButtons('bold', 'italic', 'underline');
        }
        if(me.enableAlignments){
            updateButtons('justifyleft', 'justifycenter', 'justifyright', 'justifyfull');
        }
        if(!Ext.isSafari2 && me.enableLists){
            updateButtons('insertorderedlist', 'insertunorderedlist');
        }



        toolbarSubmenus = me.toolbar.query('menu');
        for (i = 0; i < toolbarSubmenus.length; i++) {
            toolbarSubmenus[i].hide();
        }
        me.syncValue();
    },
});

Ext.override(Ext.data.TreeStore, {
    hasFilter: false,
    lastCachedTree: [],
    isCacheable: false,

    filter: function(filters, value) {
        if (Ext.isString(filters)) {
            filters = {
                property: filters,
                value: value
            };
        }

        var me = this,
            decoded = me.decodeFilters(filters),
            i = 0,
            length = decoded.length;

        for (; i < length; i++) {
            me.filters.replace(decoded[i]);
        }

        Ext.Array.each(me.filters.items, function(filter) {
            Ext.Object.each(me.tree.nodeHash, function(key, node) {
                if (filter.filterFn) {
                    if (!filter.filterFn(node)) node.remove();
                } else {
                    if (node.data[filter.property] != filter.value) node.remove();
                }
            });
        });
        me.hasFilter = true;

        console.log(me);
    },

    clearFilter: function() {
        var me = this;
        me.filters.clear();
        me.hasFilter = false;
        me.load();
    },

    isFiltered: function() {
        return this.hasFilter;
    }
});

Ext.override(Ext.data.TreeStore, {
    hasFilter: false,

    filter: function (filters, value) {
        if (Ext.isString(filters)) {
            filters = {
                property: filters,
                value: value
            };
        }

        var me = this,
            decoded = me.decodeFilters(filters),
            i = 0,
            length = decoded.length;

        for (; i < length; i++) {
            me.filters.replace(decoded[i]);
        }

        Ext.Array.each(me.filters.items, function (filter) {
            Ext.Object.each(me.tree.nodeHash, function (key, node) {
                if (!filter.filterFn(node) && node.isLeaf()) me.temporallyRemoveNode(node);
            });
            Ext.Object.each(me.tree.nodeHash, function (key, node) {
                if (!node.isLeaf() && !node.hasChildNodes()) {
                    me.temporallyRemoveNode(node)
                }
            });
            Ext.Object.each(me.tree.nodeHash, function (key, node) {
                if (!node.isLeaf()) node.expand();
            });
        });

        me.hasFilter = true;
    },

    clearFilter: function () {
        var me = this;
        me.filters.clear();
        me.hasFilter = false;

        Ext.Object.each(me.tree.nodeHash, function (key, node) {
            if (!node.isLeaf() && node.hasChildNodes() && !node.isRoot()) {
                node.collapse();
            }
        });

        me.rejectChanges();
    },

    isFiltered: function () {
        return this.hasFilter;
    },

    rejectChanges: function () {
        for (var rec of this.getRemovedRecords()) {
            rec.removedFromNode.insertChild(rec.removedFromIdx, rec);
        }
    },

    temporallyRemoveNode: function (node) {
        node.removedFromNode = node.parentNode;
        node.removedFromIdx = node.parentNode.indexOf(node);
        node.remove()
    }
});

// Fixed bug when x-mask created by Ext.LoadMask been hidden but still affect scrollbar
Ext.override(Ext.LoadMask, {
    getMaskEl: function() {
        var me = this;

        if (Ext.isEmpty(me.maskEl)) {
            me.maskEl = me.el.insertSibling({
                cls: me.maskCls,
                style: {
                    zIndex: me.el.getStyle('zIndex') - 2
                }
            }, 'before');
            // Fix itself
            me.maskEl.setVisibilityMode(Ext.Element.DISPLAY);
        }

        return me.maskEl;
    },

    // FIXME: not really right way to solve problem... better find the way to prevent loading mask affect scroll at all
    // Fixed when mask of modal window occupy more space than it should due to loading mask existence on its creation
    onHide: function() {
        this.callParent();
        this.getMaskEl().hide();

        // Trigger window to recalculate its mask size
        Ext.WindowManager._onContainerResize();
    }
});

// TODO: this can be removed after kludge from above will be rewritten
Ext.override(Ext.Component, {
    setLoading : function(load, targetEl) {
        var me = this,
            config = {
                target: me
            };

        if (me.rendered) {
            if (!Ext.isEmpty(me.loadMask)) {
                // We need hide loadMask before destroy it to trigger #onHide method
                me.loadMask.hide();
                Ext.destroy(me.loadMask);
                me.loadMask = null;
            }

            if (load !== false && !me.collapsed) {
                if (Ext.isObject(load)) {
                    Ext.apply(config, load);
                } else if (Ext.isString(load)) {
                    config.msg = load;
                }

                if (targetEl) {
                    Ext.applyIf(config, {
                        useTargetEl: true
                    });
                }
                me.loadMask = new Ext.LoadMask(config);
                me.loadMask.show();
            }
        }
        return me.loadMask;
    }
});